import { postData } from "@/data";
import CategoriesList from "../components/CategoriesList";
import Post from "../components/Post";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Dashboard() {

    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/signin");

    }


    return (
        <div>
            <h1 className="mb-4">My Post</h1>
            {postData && postData.length > 0 ? (postData.map((post) => <Post
                key={post.id}
                id={post.id}
                author={post.author}
                authorEmail={"test@gmail.com"}
                date={post.datepublished}
                thumbnail={post.thumbnail}
                category={post.category}
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