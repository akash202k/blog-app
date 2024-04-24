'use client'

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Navbar() {

    const { status, data: session } = useSession();
    // const session = useSession();
    // console.log(session);
    const path = usePathname()


    return (
        <div className="flex justify-between border-b-2 m-4 pb-4">
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
                        <div className="hidden">
                            <button onClick={() => signOut()} className="btn">Sign Out</button>

                        </div>
                        <div className="flex gap-3 items-center cursor-pointer">
                            <span> + Create New</span>
                            <div><Image className="rounded-full p-0.5 border-2" src={session?.user?.image as string} width={36} height={36} alt="Profile Image" /></div>
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


        </div>
    )
}