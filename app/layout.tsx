import { Outfit } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const geistSans = Outfit({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>

        </body>
        </html>
    );
}