"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ClipboardDocumentListIcon, CogIcon, HomeIcon, UserIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Produk", href: "/products", icon: ShoppingBagIcon },
  { name: "Pesanan", href: "/orders", icon: ClipboardDocumentListIcon },
  { name: "Pelanggan", href: "/customers", icon: UserIcon },
  { name: "Pengaturan", href: "/settings", icon: CogIcon },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // Mendapatkan path saat ini

  return (
    <div className="bg-transparent text-gray-900 border-r px-5 rounded-xl h-full flex flex-col">
      <div className="p-4 text-lg font-bold tracking-wide text-center text-gray-800">
        POS-Ecommerce
      </div>
      <hr className="bg-gray-300" />
      {/* Bagian Scrollable */}
      <nav className="mt-6 flex-grow overflow-y-auto">
        <ul className="space-y-3 "> {/* Tambahkan `pr-2` untuk ruang scroll */}
          {menuItems.map((item) => {
            const isActive = pathname === item.href; // Periksa apakah item aktif
            return (
              <li key={item.name}>
                <button
                  onClick={() => router.push(item.href)}
                  className={`flex items-center w-full rounded-xl px-2 py-2 space-x-3 transition duration-200 ${
                    isActive
                      ? "bg-white shadow-lg border rounded-lg text-gray-900"
                      : "hover:text-gray-900 hover:bg-gray-200 focus:bg-gray-100"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg border ${
                      isActive ? "bg-orange-500 text-white" : "bg-white text-gray-800 shadow-lg"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[12px] font-semibold text-gray-700">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
