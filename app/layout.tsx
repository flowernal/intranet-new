import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { DocumentList } from "@/components/document-list";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const oxanium = Oxanium({
    subsets: ["latin"],
    variable: "--font-oxanium",
});

export const metadata: Metadata = {
    title: "Intranet NsP Myjava",
    description: "Zoznam interných dokumentov pre zamestnancov NsP Myjava",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${oxanium.className}`}>
            <body
                className={`antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
