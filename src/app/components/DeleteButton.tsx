"use client"
import { useRouter } from "next/navigation";



export default function DeleteButton({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmed = window.confirm("This action will delete post permanantly !");
        if (confirmed) {
            try {
                // console.log(id);
                const res = await fetch(`/api/posts/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    },

                })
                if (res.ok) {
                    console.log("Post Deleted Successfully");
                    router.push("/dashboard");
                    router.refresh();

                }
            } catch (error) {
                console.log(error);
            }


        }
    }

    return (
        <button onClick={handleDelete}>Delete</button>
    )
}