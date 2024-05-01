import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prismadb";
import { NextAuthOptions } from "next-auth";



export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
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