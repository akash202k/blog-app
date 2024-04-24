import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET_ID as string
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET_ID as string
        })
    ],
    pages: {
        signIn: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };