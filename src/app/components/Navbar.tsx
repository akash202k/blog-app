'use client'

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";


export function Navbar() {

    const { status, data: session } = useSession();
    // const session = useSession();
    // console.log(session);
    const path = usePathname()
    const [isPoupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setIsPopupVisible(false);
                // console.log(isPoupVisible);
                // console.log(popupRef);
            }

        };

        document.addEventListener("click", handleClickOutside);

        if (!isPoupVisible) {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [isPoupVisible]);





    return (
        <div className="flex justify-between border-b-2 m-4 pb-4 relative">
            <div>
                <Link href={"/"}>
                    <h1 className="text-dark text-4xl font-bold tracking-tighter">Tech News</h1>
                </Link>
                <p className="text-sm">
                    Exploring Tommarrows Inovations <br />One Byte at a time.
                </p>
            </div>

            {path != "/signin" ? // if on /signin page dont show signin button 
                (status === "authenticated" ? (
                    <>
                        <div ref={popupRef} className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md  flex-col gap-3 text-center min-w-[160px] text-sm ${isPoupVisible ? "flex" : "hidden"
                            }`}>
                            <div className="font-bold">{session.user?.name}</div>
                            {/* <div>{session.user?.email}</div> */}
                            <Link onClick={() => setIsPopupVisible(false)} className="hover:underline flex flex-col gap-2 hover:text-blue-800" href={"/dashboard"}>Dashboard</Link>
                            <Link onClick={() => setIsPopupVisible(false)} className="hover:underline flex flex-col gap-2 hover:text-blue-800" href={"/create-post"}>Create Post</Link>
                            <button onClick={() => signOut()} className="btn">Sign Out</button>

                        </div>
                        <div className="flex gap-3 mr-6 items-center cursor-pointer">
                            {path != "/create-post" && (
                                <div className="mr-6 hover:bg-slate-200/50 rounded-lg p-2 ">
                                    <Link className="hidden md:flex gap-1.5" href={"/create-post"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <span>
                                            Create New
                                        </span>
                                    </Link>
                                </div>
                            )}
                            <div>
                                <Image onClick={() => setIsPopupVisible((prev) => !prev)} className="rounded-full p-0.5 border-2"
                                    src={session?.user?.image as string}
                                    width={36} height={36}
                                    alt="Profile Image" />
                            </div>
                        </div>
                    </>
                ) : <div className="flex items-center">
                    <Link className="btn" href={"/signin"}>Sign In</Link>
                </div>) : null
            }

            {/* {(<p>{JSON.stringify(session.data)}</p>)} */}


            {/* {status === "authenticated" ? (<div>
                <button onClick={() => signOut()} className="btn">Sign Out</button>

            </div>) : <div className="flex items-center">
                <Link className="btn" href={"/signin"}>Sign In</Link>
            </div>} */}


        </div >
    )
}