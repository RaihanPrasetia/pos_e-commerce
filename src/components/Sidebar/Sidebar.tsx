"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  ClipboardDocumentListIcon,
  CogIcon,
  HomeIcon,
  UserIcon,
  ShoppingBagIcon,
} from "@heroicons/react/16/solid";

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
    <div className="bg-white text-gray-700 border-r h-full px-0 flex flex-col transition-all duration-500 ease-in-out">
      <div
        className={`py-4 text-lg font-bold tracking-wide text-center ${
          isOpen ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-in-out`}
      >
        POS-Ecommerce
      </div>
      <hr className="bg-gray-300" />

      <nav
  className={`mt-6 flex-grow overflow-y-auto transition-all duration-500 ease-in-out ${
    isOpen ? "px-3" : "px-0"
  }`}
>
  <ul className="space-y-3">
    {menuItems.map((item) => {
      const isActive = pathname.startsWith(item.href);
      return (
        <li key={item.name}>
          <button
            onClick={() => router.push(item.href)}
            className={`flex items-center w-full px-3 py-2 space-x-3 transition-all duration-500 ease-in-out rounded-xl ${
              isActive
                ? isOpen
                  ? "bg-white text-gray-700 border shadow-lg "
                  : "bg-transparent text-gray-700 "
                : "hover:bg-gray-200"
            }`}
          >
            {/* Ikon Menu */}
            <div
              className={`p-2 rounded-lg transition-all duration-500 ease-in-out ${
                isActive
                  ? "text-white bg-orange-500"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
            </div>
            {/* Label Menu */}
            <span
              className={`text-sm font-semibold transition-opacity duration-500 ease-in-out ${
                isOpen ? "opacity-100" : "opacity-0"
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
