import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/Provider/ReduxProvider";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-cinzel",
});

export const metadata: Metadata = {
    title: "Ascela Dashboard",
    description: "Ascela Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${cinzel.className} ${cinzel.variable} antialiased`}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
