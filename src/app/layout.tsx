"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarFixed, setSidebarFixed] = useState(false);
    const pathname = usePathname();

    // **Halaman yang tidak memerlukan sidebar & navbar**
    const hiddenLayoutPages = ["/dashboard", "/products", "/customers"];

    if (!hiddenLayoutPages.some((route) => pathname.startsWith(route))) {
        return (
            <html lang="en">
                <body>
                    <AuthProvider>{children}</AuthProvider>
                </body>
            </html>
        );
    }

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
        setSidebarFixed(!isSidebarFixed);
    };

    return (
        <html lang="en">
            <body className="flex min-h-screen bg-gray-100 text-black">
                <AuthProvider>
                    {/* Sidebar */}
                    <div
                        className={`fixed h-full mt-3 transition-all duration-500 ease-in-out ${isSidebarOpen ? "w-64" : "w-16"}`}
                        onMouseEnter={() => {
                            if (!isSidebarFixed) setSidebarOpen(true);
                        }}
                        onMouseLeave={() => {
                            if (!isSidebarFixed) setSidebarOpen(false);
                        }}
                    >
                        <Sidebar isOpen={isSidebarOpen} />
                    </div>

                    <div className={`flex flex-col min-h-screen flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
                        {/* Navbar */}
                        <Navbar toggleSidebar={handleSidebarToggle} />

                        {/* Main Content */}
                        <main className="px-16 pb-8 min-h-[100vh]">{children}</main>

                        {/* Footer */}
                        <Footer />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
