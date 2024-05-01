import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth/route"


export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            error: "User not authenticated"
        }, { status: 401 })
    }
    const { title, content, links, category, imageUrl, publicId } = await req.json();
    const authorEmail = session.user?.email as string

    if (!title || !content) {
        return NextResponse.json({
            error: "Title & Content are required"
        }, { status: 500 })
    }

    try {

        const postData = {
            title,
            content,
            links,
            imageUrl,
            publicId,
            catName: category,
            authorEmail
        }
        const newPost = await prisma.post.create({

            data: postData
        })

        console.log("New Post Created");
        // console.log(postData);
        return NextResponse.json(newPost);

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something went wrong at our end"
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const allPosts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json(allPosts);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something went wrong while getting post"
        });
    }
}

