"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { Grid } from "@mui/material";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarFixed, setSidebarFixed] = useState(false);
    const pathname = usePathname();

    // **Halaman yang tidak memerlukan sidebar & navbar**
    const hiddenLayoutPages = ["/dashboard", "/products", "/customers", "/transaction", "/order", "/settings", "/store", "/profile"];

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
                        className={`h-full lg:block fixed z-50 mt-3 lg:top-0 top-16 transition-all duration-500 ease-in-out ${isSidebarOpen ? "w-64" : "w-0 lg:w-16"}`}
                        onMouseEnter={() => {
                            if (!isSidebarFixed) setSidebarOpen(true);
                        }}
                        onMouseLeave={() => {
                            if (!isSidebarFixed) setSidebarOpen(false);
                        }}
                    >
                        <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />
                    </div>

                    <div className={`transition-all w-full duration-500 ease-in-out ${isSidebarOpen ? "lg:ml-64" : "lg:ml-16"}`}>
                        {/* Navbar */}
                        <Navbar toggleSidebar={handleSidebarToggle} isSidebar={isSidebarOpen} />

                        <div className="px-4 min-h-screen">{children}</div>

                        {/* Footer */}
                        <Footer />

                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
