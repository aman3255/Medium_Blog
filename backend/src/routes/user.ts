import { Hono } from "hono";
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from "aman3255-common_backend_fronted";

import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

// ====== Signup route for user ======
userRouter.post('/signup', async (c) => {
  const body = await c.req.json();

  // ZOD validation for signup
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400); // Use 400 for bad request instead of 411
    return c.json({
      message: "Invalid input data (Inputs are not correct)"
    });
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        username: body.username
      }
    });

    if (existingUser) {
      c.status(409); // 409 Conflict for user already exists
      return c.json({
        message: "User already exists"
      });
    }

    // TODO: Hash the password before storing (security improvement)
    // const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        username: body.username,
        name: body.name,
        password: body.password // Should be hashed password
      },
    });

    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    return c.json({
      message: "User created successfully",
      token: jwt
    });

  } catch (e) {
    console.error("Database error:", e);
    c.status(500);
    return c.json({
      message: "Internal server error"
    });
  } finally {
    await prisma.$disconnect();
  }
});

// ====== Signin route for user ======
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      message: "Invalid input data"
    });
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password, // Should compare with hashed password
      },
    });

    if (!user) {
      c.status(401); // 401 Unauthorized
      return c.json({
        message: "Invalid credentials"
      });
    }

    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    return c.json({
      message: "Login successful",
      token: jwt
    });

  } catch (e) {
    console.error("Database error:", e);
    c.status(500);
    return c.json({
      message: "Internal server error"
    });
  } finally {
    await prisma.$disconnect();
  }
});