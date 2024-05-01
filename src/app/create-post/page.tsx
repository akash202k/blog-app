import CreatePostForm from "../components/CreatePostForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth"


export default async function CreatePost() {

    const session = await getServerSession(authOptions);
    // console.log(session);
    if (!session) {
        redirect("/signin");
    }


    return (
        <CreatePostForm />
    )
}