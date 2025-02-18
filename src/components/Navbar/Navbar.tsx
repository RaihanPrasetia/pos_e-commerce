"use client";

import { useState, useEffect, useRef } from "react";
import {
    Bars3Icon,
    BellIcon,
    Bars3CenterLeftIcon,
    ShoppingCartIcon,
    ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth hook
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { authLogout } from "@/libs/service/authService";

type NavbarProps = {
    toggleSidebar: () => void;
    isSidebar: boolean;
};

const breadcrumbMap: { [key: string]: string } = {
    dashboard: "Dashboard",
    products: "Products",
    "new-product": "New Product",
    "edit-product": "Edit Product",
    category: "List Category",
};

export default function Navbar({ toggleSidebar, isSidebar }: NavbarProps) {
    const { logout } = useAuth(); // Get logout method from AuthContext
    const router = useRouter();
    const pathname = usePathname();

    const [isSidebarActive, setSidebarActive] = useState(false);
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Refs untuk dropdown notification dan profil
    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // Fungsi untuk membuka/tutup dropdown
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Function to handle sidebar toggle
    const handleToggleSidebar = () => {
        toggleSidebar();
        setSidebarActive((prevState) => !prevState); // Toggle the active state
    };

    // Function to handle logout
    const handleLogout = async () => {
        authLogout();
        logout();
    };

    // Function to toggle notification dropdown
    const handleToggleNotification = () => {
        setNotificationOpen((prev) => !prev);
    };

    // Generate breadcrumb array from pathname
    const breadcrumbs = pathname
        .split("/")
        .filter((segment) => segment) // Remove empty segments
        .map((segment, index, array) => ({
            label: breadcrumbMap[segment] || segment, // Map to friendly name or keep original
            path: "/" + array.slice(0, index + 1).join("/"), // Build path up to current segment
            isActive: index === array.length - 1, // Check if it's the last segment
        }));

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setNotificationOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle scroll event to change navbar style
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`flex items-center justify-between lg:px-4 lg:py-6 p-4 transition-all duration-300 ${isScrolled ? `fixed z-50 bg-white shadow-md rounded-md` : "bg-transparent text-white"} ${isSidebar ? `lg:left-64 ml-4 right-4 left-4` : "lg:right-4 lg:left-20 left-4 right-4"}`}>
            {/* Konten Navbar (toggleSidebar, breadcrumb) */}
            <div className="flex items-center space-x-6">
                {/* Tombol Toggle Sidebar */}
                <button
                    onClick={handleToggleSidebar}
                    className={`p-2 transition rounded-lg ${isSidebar
                        ? "bg-gradient-to-br from-pink-500 to-purple-700 border-2 border-gray-100 shadow-mui-customShadow text-white"
                        : "text-slate-600 hover:bg-white hover:shadow-mui-customShadow hover:text-gray-900"
                        }`}
                >
                    {isSidebar ? (
                        <Bars3CenterLeftIcon className="h-6 w-6 rotate-180" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
                {/* Breadcrumb */}
                <div className="flex flex-col text-gray-400">
                    <div className="flex space-x-2">
                        {breadcrumbs.map((breadcrumb, index) => (
                            <div key={breadcrumb.path} className="flex items-center">
                                {!breadcrumb.isActive ? (
                                    <button
                                        onClick={() => router.push(breadcrumb.path)}
                                        className="hover:text-gray-900 transition"
                                    >
                                        {breadcrumb.label}
                                    </button>
                                ) : (
                                    <span className="text-gray-800 font-semibold">
                                        {breadcrumb.label}
                                    </span>
                                )}
                                {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Konten Navbar (Search, Notifikasi, Logout Button) */}
            <div className="flex items-center space-x-4 relative">
                <div className="relative">
                    <button className="p-2.5 transition rounded-full text-slate-600 hover:bg-white hover:shadow-lg hover:text-gray-900">
                        <ShoppingCartIcon className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                            5
                        </span>
                    </button>
                </div>

                {/* Notifikasi dengan Dropdown */}
                <div ref={notificationRef} className="relative">
                    <button
                        onClick={handleToggleNotification}
                        className={`relative p-2 transition rounded-full ${isNotificationOpen
                            ? "bg-gradient-to-br from-pink-500 to-purple-700 text-white shadow-lg"
                            : "text-slate-600 hover:bg-white hover:shadow-lg hover:text-gray-900"
                            }`}
                    >
                        <BellIcon className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                            3
                        </span>
                    </button>
                    {isNotificationOpen && (
                        <div className="absolute z-50 right-0 mt-2 w-64 bg-white border border-gray-200 rounded-sm shadow-xl">
                            <ul className="text-sm text-gray-500 font-medium">
                                <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                                    New product added!
                                </li>
                                <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                                    Order #12345 shipped!
                                </li>
                                <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">
                                    You have 2 unread messages
                                </li>
                                <li className="px-4 py-3 bg-gradient-to-br from-pink-500 to-purple-700 text-white hover:brightness-110 cursor-pointer text-center rounded-b-sm shadow-md transition-all duration-300 ease-in-out">
                                    View all notifications
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Logout Button */}
                <div ref={profileRef} className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden"
                    >
                        {/* Gambar Avatar (boleh diganti dengan gambar profil pengguna) */}
                        <Image
                            src="/assets/img/avatar/profile.png" // URL gambar placeholder (ganti dengan gambar avatar sebenarnya)
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                        />
                    </button>
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute z-50 right-0 p-4 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-100">
                            <ul className="text-sm text-gray-600">
                                {/* My Profile */}
                                <li
                                    onClick={() => router.push('/profile')}
                                    className="flex items-center rounded-md p-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    <Image
                                        src="/assets/img/avatar/profile.png" // URL gambar placeholder (ganti dengan gambar avatar sebenarnya)
                                        alt="User Avatar"
                                        className="w-5 h-5 object-cover mr-2"
                                        width={100}
                                        height={100}
                                    />
                                    <span>My Profile</span>
                                </li>

                                <hr className="flex bg-slate-600 my-2" />

                                {/* Logout */}
                                <li
                                    onClick={handleLogout}
                                    className="flex items-center bg-gradient-to-r from-rose-500 via-rose-500 to-red-600 text-white rounded-md p-3 hover:brightness-110 cursor-pointer"
                                >
                                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 text-slate-200" />
                                    <span>Logout</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}