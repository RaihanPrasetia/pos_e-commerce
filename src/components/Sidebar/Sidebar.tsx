import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    ClipboardDocumentListIcon,
    CogIcon,
    HomeIcon,
    UserIcon,
    ShoppingBagIcon,
    PlusIcon,
    ListBulletIcon,
    TagIcon,
    ChevronDownIcon,
    BuildingStorefrontIcon,
    XMarkIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import { BiCartAdd } from "react-icons/bi";

const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    {
        name: "Produk",
        href: "/products",
        icon: ShoppingBagIcon,
        subMenu: [
            { name: "List Product", href: "/products", icon: ListBulletIcon },
            { name: "New Product", href: "/products/new-product", icon: PlusIcon },
            { name: "Category", href: "/products/category", icon: TagIcon },
        ],
    },
    { name: "Transaction", href: "/transaction", icon: BiCartAdd },
    { name: "Order", href: "/order", icon: ClipboardDocumentListIcon },
    { name: "Customer", href: "/customers", icon: UserIcon },
    { name: "Store", href: "/store", icon: BuildingStorefrontIcon },
];

export type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void; // Add toggleSidebar prop
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };
    const handleToggleSidebar = () => {
        toggleSidebar();
    };

    return (
        <div className="bg-white relative lg:block sm:hidden shadow-mui-customShadow text-gray-700 border-r rounded-r-xl h-full flex flex-col transition-all duration-300 ease-in-out">
            {/* Close button for mobile */}
            <div className="lg:hidden flex justify-end p-2 absolute top-2 right-2">
                <button onClick={handleToggleSidebar} className="text-gray-700">
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="py-4 text-base font-bold tracking-wide text-center flex items-center justify-center space-x-4">
                {isOpen ? (
                    <>
                        <Image
                            src="/assets/img/avatar/profile.png"
                            alt="Logo"
                            className="w-10 h-10 rounded-full"
                            width={100}
                            height={100}
                        />
                        <div className="text-center transition-opacity duration-1000 ease-in-out opacity-100 text-nowrap">
                            POS-Ecommerce
                        </div>
                    </>
                ) : (
                    <Image
                        src="/assets/img/avatar/profile.png"
                        alt="Logo"
                        className="w-10 h-10 rounded-full"
                        width={100}
                        height={100}
                    />
                )}
            </div>
            <hr className="bg-gray-300 mb-4" />

            <nav className={`flex-grow overflow-hidden ${isOpen ? "px-3" : "px-0"} transition-all duration-300`}>
                <ul className="space-y-3">
                    {menuItems.map((item) => {
                        const hasSubMenu = item.subMenu && item.subMenu.length > 0;
                        const isActive =
                            pathname === item.href ||
                            (hasSubMenu && item.subMenu.some((subItem) => pathname === subItem.href)) ||
                            (item.href === "/customers" && pathname.startsWith("/customers")) ||
                            (item.href === "/products" && pathname.startsWith("/products"));

                        return (
                            <li key={item.name}>
                                {/* Menu Utama */}
                                <button
                                    onClick={() => (hasSubMenu ? toggleDropdown(item.name) : router.push(item.href))}
                                    className={`flex justify-start items-center w-full px-3 py-2 space-x-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out ${isActive
                                        ? `${isOpen ? "bg-purple-200 text-purple-700 shadow-mui-customShadow" : "text-gray-900"}`
                                        : "hover:bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    <div
                                        className={`p-2 rounded-lg transition-all duration-300 ${isActive
                                            ? "text-white bg-gradient-to-br from-pink-500 to-purple-700 shadow-lg"
                                            : "bg-white text-gray-700 border border-gray-300"
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        {isOpen && <span>{item.name}</span>}

                                        {hasSubMenu && isOpen && (
                                            <ChevronDownIcon
                                                className={`w-5 h-5 ml-auto flex justify-end transition-transform duration-300 ${activeDropdown === item.name ? "transform rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </div>
                                </button>

                                {/* Submenu */}
                                {hasSubMenu && activeDropdown === item.name && (
                                    <ul
                                        className={`mt-2 space-y-2 ${isOpen ? "pl-6" : "pl-2"} transition-all duration-300`}
                                    >
                                        {item.subMenu.map((subItem) => {
                                            const isSubActive = pathname === subItem.href;

                                            return (
                                                <li key={subItem.name}>
                                                    <button
                                                        onClick={() => router.push(subItem.href)}
                                                        className={`flex items-center w-full px-3 py-2 space-x-2 rounded-md text-sm font-medium ${isSubActive
                                                            ? `${isOpen ? "bg-pink-100 text-pink-600" : "text-pink-600"}`
                                                            : "hover:bg-gray-50 text-gray-600"
                                                            }`}
                                                    >
                                                        <div
                                                            className={`p-1 rounded-full transition-colors duration-300 ${isSubActive
                                                                ? "bg-gradient-to-br from-pink-500 to-purple-700 text-white"
                                                                : "bg-gray-200 text-gray-500"
                                                                }`}
                                                        >
                                                            <subItem.icon className="w-4 h-4" />
                                                        </div>
                                                        {isOpen && <span>{subItem.name}</span>}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}


