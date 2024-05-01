import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth/route"


export async function GET(req: Request, { params }: { params: { postid: string } }) {

    // console.log(params.postid);
    const id = params.postid;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Invalid post"
        })
    }

}

export async function PUT(req: NextRequest, { params }: { params: { postid: string } }) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            error: "User not authenticated"
        }, { status: 401 })
    }

    const id = params.postid
    const { title, content, links, selectedCategories, imageUrl, publicId } = await req.json();
    // console.log(data);

    try {
        const updatedPost = await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                content,
                links,
                catName: selectedCategories,
                imageUrl,
                publicId,

            },

        })

        return NextResponse.json(updatedPost)
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something went wrong while updating post"
        }, { status: 500 })
    }


}

export async function DELETE(req: NextRequest, { params }: { params: { postid: string } }) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            error: "User not authenticated"
        }, { status: 401 })
    }

    // console.log(params.postid);
    const id = params.postid;
    try {

        const delPost = await prisma.post.delete({
            where: { id }
        })
        // console.log(delPost);
        return NextResponse.json({
            message: "Your post deleted"
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something went wrong while deleting the post"
        })
    }
}