import prisma from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"



export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    const email = params.email

    try {
        const posts = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                posts: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })

        console.log(posts);
        return NextResponse.json(posts);

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something went wrong while fetching posts"
        })
    }
}