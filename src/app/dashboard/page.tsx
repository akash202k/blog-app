import CategoriesList from "../components/CategoriesList";
import Post from "../components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/route"
import { TPost } from "../lib/types";

const getUserPosts = async (email: string) => {

    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/author/${email}`);
        if (res.ok) {
            const { posts } = await res.json();
            return posts;
        }
    } catch (error) {
        return []
    }
}

export default async function Dashboard() {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    let posts = [];
    if (!session) {
        redirect("/signin");
    }

    if (email) {
        posts = await getUserPosts(email)
    }

    return (
        <div>
            <h1 className="mb-4">My Post</h1>
            {posts && posts.length > 0 ? (posts.map((post: TPost) => <Post
                key={post.id}
                id={post.id}
                author={session.user?.name as string}
                authorEmail={post.authorEmail}
                date={post.createdAt}
                thumbnail={post.imageUrl}
                category={post.catName}
                title={post.title}
                content={post.content}
                links={post.links || []}

            />)) : (
                <div className="flex flex-col items-center">
                    <h2>No Post Created yet</h2>
                    <Link className="underline text-blue-800" href={"/create-post"}>Create New Post</Link>
                </div>
            )}
        </div >

    )
}