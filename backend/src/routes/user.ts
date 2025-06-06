import { signinInput, signupInput } from "@khetesh/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

type Variables = {
  userId: string;
};
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables;
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsedRes = signupInput.safeParse(body);

  if (!parsedRes.success) {
    return c.json(
      {
        message: "Invalid inputs!",
      },
      411
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: parsedRes.data.email,
        password: parsedRes.data.password,
        name: parsedRes.data?.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      message: "User created !!",
      token: token,
    });
  } catch (e) {
    if ((e as any).code === "P2002") {
      return c.json({ error: "Email already exists" }, 403);
    }
    return c.json({ error: "Internal Server error!" }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsedRes = signinInput.safeParse(body);

  if (!parsedRes.success) {
    return c.json(
      {
        message: "Invalid inputs!",
      },
      411
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: parsedRes.data.email },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 403);
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      message: "User Logged In !!",
      token: token,
    });
  } catch (e) {
    return c.json({ error: "Inavlid email or password!" }, 401);
  }
});
