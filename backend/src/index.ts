import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";

type Variables = {
  userId: string;
};

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables;
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");

  if (!jwt) {
    return c.json({ error: "Unauthorized!" }, 403);
  }

  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ error: "Unauthorized!" }, 403);
  }
  const userId = (payload as any).id;
  c.set("userId", userId);
  await next();
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
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

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
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

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog route");
});

app.post("/api/v1/blog", (c) => {
  return c.text("signin route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("signin route");
});

export default app;
