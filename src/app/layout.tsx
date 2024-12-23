"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";  // Import AuthProvider
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Jangan tampilkan Sidebar atau Navbar di halaman login
  if (pathname === "/login") {
    return (
      <html lang="en">
        <body>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100 text-black">
        <AuthProvider> {/* Wrap entire layout with AuthProvider */}
          {/* Sidebar */}
          <div
            className={`fixed h-full w-72 mt-3 p-4 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-700`}
          >
            <Sidebar />
          </div>

          <div
            className={`flex flex-col flex-1 ${isSidebarOpen ? "ml-72" : "ml-0"} transition-all duration-700`}
          >
            {/* Navbar */}
            <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

            {/* Main Content */}
            <main className="p-4">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
