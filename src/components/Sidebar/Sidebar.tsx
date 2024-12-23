import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    ClipboardDocumentListIcon,
    CogIcon,
    HomeIcon,
    UserIcon,
    ShoppingBagIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";

const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Produk", href: "/products", icon: ShoppingBagIcon },
    { name: "Pesanan", href: "/orders", icon: ClipboardDocumentListIcon },
    { name: "Pelanggan", href: "/customers", icon: UserIcon },
    { name: "Pengaturan", href: "/settings", icon: CogIcon },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="bg-white shadow-mui-customShadow text-gray-700 border-r rounded-r-xl h-full flex flex-col transition-all duration-300 ease-in-out">
            <div className="py-4 text-base font-bold tracking-wide text-center flex items-center transition-all duration-300 justify-center space-x-4">
                {/* Ketika sidebar dibuka, tampilkan gambar dan teks */}
                {isOpen ? (
                    <>
                        <Image
                            src="https://picsum.photos/600" // Gantilah dengan URL gambar yang sesuai
                            alt="Logo"
                            className="w-10 h-10 rounded-full"
                            width={24} // Ukuran gambar sesuai
                            height={24}
                        />
                        <div
                            className={`text-center transition-opacity duration-1000 ease-in-out opacity-100 text-nowrap`}
                        >
                            POS-Ecommerce
                        </div>
                    </>
                ) : (
                    // Ketika sidebar ditutup, hanya tampilkan gambar
                    <Image
                        src="https://picsum.photos/600" // Gantilah dengan URL gambar yang sesuai
                        alt="Logo"
                        className="w-10 h-10 rounded-full"
                        width={10}
                        height={10}
                    />
                )}
            </div>
            <hr className="bg-gray-300 mb-4" />

            <nav
                className={`mt-6 flex-grow overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? "px-3" : "px-0"
                    }`}
            >
                <ul className="space-y-3">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => router.push(item.href)}
                                    className={`flex items-center w-full px-3 py-2 space-x-3 transition-all duration-300 ease-in-out rounded-xl ${isActive
                                        ? isOpen
                                            ? "bg-white text-gray-700 border shadow-mui-customShadow"
                                            : "bg-transparent text-gray-700"
                                        : "hover:bg-gray-200"
                                        }`}
                                >
                                    {/* Ikon Menu */}
                                    <div
                                        className={`p-2 rounded-lg transition-all duration-300 ease-in-out ${isActive
                                            ? "text-white bg-gradient-to-br from-pink-500 to-purple-700 border-2 border-gray-100 shadow-mui-customShadow"
                                            : "bg-white text-gray-700 border-2 border-gray-100 shadow-mui-customShadow"
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    {/* Label Menu */}
                                    <span
                                        className={`text-sm font-semibold transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
