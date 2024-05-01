import EditPostForm from "@/app/components/EditPostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/route"
import { redirect } from "next/navigation";
import { TPost } from "@/app/lib/types";


const getPost = async (id: string): Promise<TPost | null> => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`);
        if (res.ok) {
            const post = await res.json();
            // console.log(post);
            return post;
        }
    } catch (error) {
        console.log(error);
    }
    return null

}

export default async function EditPost({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/signin");
    }

    const id = params.id;

    const post = await getPost(id);


    return (
        <>
            {post ? <EditPostForm post={post} /> : (
                <div>Invalid Post</div>
            )}
        </>
    )

}