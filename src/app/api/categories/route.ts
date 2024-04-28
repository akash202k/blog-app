import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function GET() {

    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({
            error: "Something went wrong ."
        })
    }

}