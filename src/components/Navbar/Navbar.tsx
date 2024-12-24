"use client";

import { useState, useEffect, useRef } from "react";
import {
    Bars3Icon,
    BellIcon,
    Bars3CenterLeftIcon,
    ShoppingCartIcon,
    CogIcon,
    UserCircleIcon,
    ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth hook
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

type NavbarProps = {
    toggleSidebar: () => void;
};

const breadcrumbMap: { [key: string]: string } = {
    dashboard: "Dashboard",
    products: "Products",
    "new-product": "New Product",
    "edit-product": "Edit Product",
    category: "List Category",
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
    const { logout } = useAuth(); // Get logout method from AuthContext
    const router = useRouter();
    const pathname = usePathname();

    const [isSidebarActive, setSidebarActive] = useState(false);
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

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
    const handleLogout = () => {
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

    return (
        <nav className="flex items-center justify-between bg-transparent px-4 py-6 text-white">
            {/* Konten Navbar (toggleSidebar, breadcrumb) */}
            <div className="flex items-center space-x-6">
                {/* Tombol Toggle Sidebar */}
                <button
                    onClick={handleToggleSidebar}
                    className={`p-2 transition rounded-lg ${isSidebarActive
                        ? " bg-gradient-to-br from-pink-500 to-purple-700 border-2 border-gray-100 shadow-mui-customShadow text-white"
                        : "text-slate-600 hover:bg-white hover:shadow-mui-customShadow hover:text-gray-900"
                        }`}
                >
                    {isSidebarActive ? (
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
            <div className="flex items-center space-x-4 px-6 relative">
                {/* Search Bar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 px-4 py-2 rounded-md shadow-mui-customShadow border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                </div>

                <div className="relative">
                    <button className="p-2.5 transition rounded-full text-slate-600  hover:bg-white hover:shadow-lg hover:text-gray-900">
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
                        className={`relative p-2 transition rounded-full  ${isNotificationOpen
                            ? "bg-gradient-to-br from-pink-500 to-purple-700 text-white shadow-lg"
                            : "text-slate-600  hover:bg-white hover:shadow-lg hover:text-gray-900"
                            }`}
                    >
                        <BellIcon className="h-6 w-6" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                            3
                        </span>
                    </button>
                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-sm shadow-xl">
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
                        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-gray-300"
                    >
                        {/* Gambar Avatar (boleh diganti dengan gambar profil pengguna) */}
                        <Image
                            src="https://picsum.photos/700" // URL gambar placeholder (ganti dengan gambar avatar sebenarnya)
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                            width={16}
                            height={16}
                        />
                    </button>
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 p-4 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-100">
                            <ul className="text-sm text-gray-600">
                                {/* My Profile */}
                                <li
                                    onClick={() => router.push('/profile')}
                                    className="flex items-center rounded-md p-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    <UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" />
                                    <span>My Profile</span>
                                </li>
                                <hr className="flex bg-slate-600 my-2" />

                                {/* Settings */}
                                <li
                                    onClick={() => router.push('/settings')}
                                    className="flex items-center rounded-md p-3 hover:bg-gray-100 cursor-pointer"
                                >
                                    <CogIcon className="h-5 w-5 mr-2 text-gray-500" />
                                    <span>Settings</span>
                                </li>

                                <hr className="flex bg-slate-600 my-2" />

                                {/* Logout */}
                                <li
                                    onClick={handleLogout}
                                    className="flex items-center bg-gradient-to-r from-rose-500 via-rose-500 to-red-600 text-white rounded-md p-3 hover:brightness-110 cursor-pointer"

                                >
                                    <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-2 text-slate-200" />
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
