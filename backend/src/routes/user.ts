import { Hono } from "hono";
import { sign } from 'hono/jwt' //for jwt;
import { signupInput, signinInput } from "aman3255-common_backend_fronted"; // zod for validation
// ==============================================================
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
// ==============================================================



// Bindings are the global variables that can be used in the whole application.
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
    c.status(411);
    return c.json({
      message: "Invalid input data(Inputs are not correct)"
    })
  }

  // ================ Prisma ======================
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,  // Use DATABASE_URL from environment
      },
    },
  }).$extends(withAccelerate());
  // ======================================

  try {
    const user = await prisma.user.create({ //Here we are using create the user in db.
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });
    // ===== for jwt =======
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)
    // =====================
    return c.text(jwt);
  } catch (e) {
    c.status(411);
    return c.text('User already exists');
  } finally {
    await prisma.$disconnect();
  }
});

// ====== Signin route for user ======
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();

  //Zod validation for signin
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid input data(Input are not correct)"
    })
  }
  // =============== Prisma =======================
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,  // Use DATABASE_URL from environment
      },
    },
  }).$extends(withAccelerate());
  // =====================================

  try {
    const user = await prisma.user.findFirst({ //Here we are using findFirst for checking the user.
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403); // 403 code for unauthorized access
      return c.text('Invalid (User does not exist !!!)');
    }
    // ===== for jwt =======
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)
    // ====================
    return c.text(jwt);
  } catch (e) {
    c.status(403);
    return c.text('User already exists');
  } finally {
    await prisma.$disconnect();
  }
})
