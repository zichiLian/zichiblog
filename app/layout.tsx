'use client'
import { Outfit,Ovo } from "next/font/google";
import "./globals.css";
// import Leftnavbar from "@/app/main/Leftnavbar";
// import Rightnavbar from "@/app/main/Rightnavbar";
// import Draws from "@/app/components/quills";
import React from "react";
import { usePathname } from 'next/navigation';




const geistSans = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Outfit({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



    export default function RootLayout({children,}:
    Readonly<{
  children: React.ReactNode;
}>) {
    // Use a ref to access the quill instance directly
        const pathname = usePathname();



        const isErrorPage =
            pathname === '/404' ||
            pathname === '/500' ||
            pathname.startsWith('/_error');


        if (isErrorPage) {
            return (
                <div className="error-layout">
                    {children}
                </div>
            );
        }


        return (

    <html lang="en">

    <body
        style={{
            background: "var(--background)",//设置背景颜色为变量
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >

    <div className="box">
        {/*<Leftnavbar/>*/}
        {children}
        {/*<Rightnavbar/>*/}
        {/*<Draws/>*/}
    </div>
    </body>
    </html>

  );

}
