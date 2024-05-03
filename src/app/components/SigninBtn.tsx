'use client'

import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import Github from "next-auth/providers/github";
import { redirect, useRouter } from "next/navigation";


export default function SigninBtn() {
    const { status } = useSession();

    if (status === "authenticated") {
        redirect("/dashboard");
    }

    return (
        <div className="flex flex-col items-center gap-4 mt-4 p-4">
            <h1>Sign In</h1>


            {/* <button onClick={() => signIn('github')} className="flex items-center px-6 gap-4 py-2 border rounded-full hover:bg-slate-100/75 transition">
                <span>
                    <Image
                        src={"/github.png"}
                        alt="github logo"
                        width={30}
                        height={30}
                    />
                </span>
                Sign In With Github
            </button> */}

            <button onClick={() => signIn('google')} className="flex items-center px-6 gap-4 py-2 border rounded-full hover:bg-slate-100/75 transition">
                <span>
                    <Image
                        src={"/google.png"}
                        alt="google logo"
                        width={30}
                        height={30}
                    />
                </span>
                Sign In With Google
            </button>
        </div>
    )
}
