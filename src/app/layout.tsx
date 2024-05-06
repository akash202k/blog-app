import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import NextAuthProvider from "./components/NextAuthProvider"
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechNews",
  description: "TechNews",
  icons: "./favicon.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="lg:max-w-[900px] lg:px-16 px-8 mx-auto py-8 shadow-xl min-h-screen flex flex-col">
            <Navbar />
            {/* <Notification /> */}
            <NextTopLoader />
            <div className="flex-auto">
              {children}
            </div>
            <Footer />
          </div>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
