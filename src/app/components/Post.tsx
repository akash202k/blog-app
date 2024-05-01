import Image from "next/image"
import Link from "next/link"
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth/route"

interface PostProps {
    id: string,
    author: string,
    authorEmail?: string,
    date: string,
    thumbnail?: string,
    category?: string,
    title: string,
    content: string,
    links?: string[]
}


export default async function Post({
    id,
    author,
    authorEmail,
    date,
    thumbnail,
    category,
    title,
    content,
    links
}: PostProps) {

    const session = await getServerSession(authOptions);
    const isEditable = session && session.user?.email === authorEmail;
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric"
    }
    const formatedDate = dateObject.toLocaleDateString('en-IN', options)


    return (
        <div>
            <div>
                Posted By : <span className="font-bold ">{author}</span> on <span>{formatedDate}</span>
            </div>

            <div className="w-full h-72 relative">
                {thumbnail ? (
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover rounded-md object-center"
                    />
                ) : (
                    <Image
                        src={"/nopost.png"}
                        alt={title}
                        fill
                        className="object-cover rounded-md object-center"
                    />
                )}
            </div>

            {category && <div className="mt-3"><Link href={`/categories/${category}`} className="cbtn  ml-2">{category}</Link></div>}
            <h1 className="text-2xl font-bold m-3 ">{title}</h1>
            <p className="m-3">{content}</p>
            <div className="flex flex-col gap-3 text-blue-900/75 hover:underline">

                {links && links?.map((link, index) =>
                    <div key={index} className="flex gap-2 items-center font-bold">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                            </svg>
                        </div>

                        <a className="max-w-full  overflow-hidden text-ellipsis" target="blank" href={`https://${link}`}>
                            {link}
                        </a>
                    </div>
                )}
            </div>

            {isEditable && (<div className="mt-5">
                <Link className="editbtn" href={`/edit-post/${id}`}>Edit</Link>
                <span className="deletebtn"><DeleteButton id={id} /></span>
            </div>)}

            <div className="border m-8"></div>


        </div>

    )
}



