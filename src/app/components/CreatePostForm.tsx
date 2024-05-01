"use client"

import React, { use, useEffect, useState } from 'react'
import { categoriesData } from "@/data"
import { link } from 'fs';
import Link from 'next/link';
import axios from 'axios';
import { TCategory } from '../lib/types';
import { useRouter } from 'next/navigation';
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from 'next/image';

interface categoryDataType {
    id: string,
    name: string
}

function CreatePostForm() {
    const router = useRouter();

    const [links, setLinks] = useState<string[]>([]);
    const [inputLink, setInputLink] = useState<string>("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [publicId, setPublicId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAllCategories = async () => {
            const res = await fetch("api/categories");
            const catNames = await res.json();
            setCategories(catNames)
            return
        }

        fetchAllCategories();
    }, [])



    function addLink(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (inputLink.trim() !== "") {
            setLinks((prev) => [...prev, inputLink]);
            setInputLink("");

        }
    }

    function removeLink(index: number): any {
        setLinks((prev) => prev.filter((_, i) => i != index));
    }

    function handleImageUpload(result: CloudinaryUploadWidgetResults) {

        // console.log("result", result);
        const event = result.event;
        const info = result.info as object;

        // console.log("event", JSON.stringify(event));
        // console.log("info", JSON.stringify(info));

        if ("secure_url" in info && "public_id" in info) {
            const url = info.secure_url as string;
            const public_id = info.public_id as string;
            console.log("url", url);
            console.log("public_id", public_id);
            setImageUrl(url);
            setPublicId(public_id);
        }


    }

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!title && !content) {
            setError("* Title and Content are required")
        }
        const formData = {
            title,
            content,
            links,
            category: selectedCategories,
            imageUrl,
            publicId,

        }

        try {
            const res = await fetch("api/posts", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            // console.log(res);

            if (res.ok) {
                router.push("/dashboard");
            }
        } catch (error) {
            return error;
        }
    }

    async function handleRemoveImage(e: React.FormEvent) {
        e.preventDefault()
        try {
            const res = await fetch("/api/remove-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application.json"
                },
                body: JSON.stringify({ publicId })

            })
            if (res.ok) {
                setImageUrl("");
                setPublicId("");

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleFormSubmit} className='py-3 space-y-4 '>
                <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' />
                <textarea onChange={(e) => setContent(e.target.value)} placeholder={"Content "} className='w-full h-40 border-2 px-1 py-2 rounded-md'></textarea>


                {
                    links && (
                        <div className='flex flex-wrap gap-2'>
                            {links.map((link, index) => (
                                <div key={index} className='flex bg-slate-200 px-3 py-2 rounded-md items-center space-x-2' >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                    </svg>
                                    <Link className='hover:text-blue-700' href={link}>{link}</Link>
                                    <span onClick={() => removeLink(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:bg-red-500  hover:text-white p-1.5 cursor-pointer rounded-md ">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </span>

                                </div>
                            ))}
                        </div>
                    )
                }

                <CldUploadButton
                    className={`h-40 w-full bg-slate-100 grid place-content-center border-2 border-black/25 border-dotted rounded-md relative ${imageUrl && "pointer-events-none "}`}
                    onUpload={handleImageUpload}
                    uploadPreset="puiuyatm"

                >
                    <div >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>


                    </div>
                    {imageUrl && (
                        <Image
                            alt='cover image'
                            fill
                            className="absolute object-cover insert-0"
                            src={imageUrl} />)}

                </CldUploadButton>


                {
                    publicId &&
                    (<div>
                        <button
                            className='px-3 py-2 bg-red-500 border-2 text-white hover:bg-red-700 rounded-md'
                            onClick={handleRemoveImage}
                        >
                            Remove Image
                        </button>
                    </div>)
                }


                <div className='flex gap-5'>
                    <input type="text" placeholder='Enter your link here' onChange={e => setInputLink(e.target.value)} value={inputLink} />
                    <button
                        className='btn flex items-center gap-2'
                        onClick={addLink}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // Prevent form submission
                                addLink(e); // Trigger addLink function
                            }
                        }}
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        <span className='text-center'>
                            Add
                        </span>
                    </button>

                </div>

                <select onChange={(e) => {
                    // console.log(e.target.value);
                    setSelectedCategories(e.target.value)
                }} className='px-3 py-2 w-full border-2 items-center rounded-md appearance-none'>
                    <option value="">Select A Category</option>
                    {categories && categories.map((category: TCategory) => (
                        <option key={category.id} value={category.catName}>
                            {category.catName}
                        </option>
                    ))}
                </select>

                <button type='submit' className='p-3 border-2 w-full rounded-md bg-slate-700 text-white hover:bg-slate-900 '>Create Post</button>
                {error && <div className=' text-red-600 p-2 '>{error}</div>}
            </form>
        </div>
    )
}

export default CreatePostForm