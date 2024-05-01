
import { authOptions } from "@/app/api/auth/route"
import NextAuth, { AuthOptions } from "next-auth";




const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };