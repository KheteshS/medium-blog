import { createBlogInput, updateBlogInput } from "@khetesh/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

type Variables = {
  userId: string;
};

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: Variables;
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const jwt = c.req.header("Authorization") || "";

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
  } catch (e) {
    return c.json({ error: "Unauthorized!" }, 403);
  }
});

// TODO: add pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({});
    return c.json({
      blogs,
    });
  } catch (e) {
    return c.json(
      {
        error: "Error while fetching blog!",
      },
      411
    );
  }
});

blogRouter.get("/:id", async (c) => {
  const blogId = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });

    return c.json({
      blog,
    });
  } catch (e) {
    return c.json(
      {
        error: "Error while fetching blog!",
      },
      411
    );
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    return c.json(
      {
        message: "Inavlid inputs!",
      },
      411
    );
  }

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
    },
  });

  return c.json({
    message: "Blog published!!",
    blogId: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    return c.json(
      {
        message: "Inavlid inputs!",
      },
      411
    );
  }

  const blog = await prisma.blog.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    message: "Blog updated!!",
    blogId: blog.id,
  });
});
