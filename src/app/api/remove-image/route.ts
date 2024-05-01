import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { json } from "stream/consumers";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const removeImage = async (publicId: string) => {
    const res = await cloudinary.uploader.destroy(publicId);
    console.log("Image Removed");
}

export async function POST(req: NextRequest) {
    const { publicId } = await req.json();
    console.log(publicId);

    await removeImage(publicId)
    return NextResponse.json({
        status: "Success"
    })
}