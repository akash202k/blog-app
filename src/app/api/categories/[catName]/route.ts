import prisma from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"



export async function GET(req: NextRequest, { params }: { params: { catName: string } }) {
    const catName = params.catName

    try {
        const posts = await prisma.category.findUnique({
            where: {
                catName
            },
            include: {
                posts: {
                    include: {
                        author: true
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })

        // console.log(posts);
        return NextResponse.json(posts);

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something went wrong fetching posts"
        })
    }
}