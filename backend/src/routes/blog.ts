import { Hono } from 'hono';
import { createBlogInput, updateBlogInput } from 'aman3255-common_backend_fronted';
// ==============================================================
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
// ==============================================================

import { verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    // ======= Initialze Global declare =====
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    // Also this middleware extract user id from jwt and passed to blog route handler like "authorId: 1"
    // Any request come to blog router will be passed thorugh this middleware for authentication.
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            });
        }
    } catch (error) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        });
    }

});


// This router is for creating(input) a new blog post.
blogRouter.post('/', async (c) => {  //postman -> POST -> http://localhost:3000/api/v1/blog
    const body = await c.req.json();


    //For zod validation for blog body input.
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid blog are not correct(Inputs are not correct)"
        })
    }
    const authorId = c.get("userId");

    // ================ Prisma ======================
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL,  // Use DATABASE_URL from environment
            },
        },
    }).$extends(withAccelerate());
    // ==============================================


    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId) // This authorId  will be extarct from jwt in middleware.
        }
    })
    return c.json({
        id: blog.id
    })
})

// This router is for UPDATE a blog post.
blogRouter.put('/', async (c) => {   // postman -> PUT -> http://localhost:3000/api/v1/blog
    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "The Upate input are not valid(Upate values are not correct)"
        })
    }
    const id = c.req.param("id");
    // ================ Prisma ======================
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL,  // Use DATABASE_URL from environment
            },
        },
    }).$extends(withAccelerate());
    // ==============================================

    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({
            id: blog.id,
            message: "Blog post updated successfully"
        })
    } catch (error) {
        c.status(201);
        return c.json({
            message: "Update failed"
        })
    }
})


// Pagination
// This router will return all the blog posts (postman -> GET -> http://localhost:3000/api/v1/blog/bulk);
blogRouter.get('/bulk', async (c) => {
    // ================ Prisma ======================
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL,  // Use DATABASE_URL from environment
            },
        },
    }).$extends(withAccelerate());
    // ==============================================
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    }); // Here we are using findMany() for fetching all the blogs.

    return c.json({
        blogs // returning all the blogs
    })
})

// This router will return a single blog post with blog id (postman -> GET -> http://localhost:3000/api/v1/blog/1);
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    // ================ Prisma ======================
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: c.env.DATABASE_URL,  // Use DATABASE_URL from environment
            },
        },
    }).$extends(withAccelerate());
    // ==============================================

    try { //Here we are using try catch block for multiple reasons like if we are not able to fetch data from db then we can return error message.
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    } catch (e) {
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        })
    }
})