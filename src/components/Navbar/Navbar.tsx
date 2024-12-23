"use client";

import { Bars3Icon, BellIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth hook
import { useRouter, usePathname } from "next/navigation";

type NavbarProps = {
  toggleSidebar: () => void;
};

const breadcrumbMap: { [key: string]: string } = {
  dashboard: "Dashboard",
  products: "Products",
  "new-product": "New Product",
  "category": "List Category",
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { logout } = useAuth(); // Get login method from AuthContext
  const router = useRouter();
  const pathname = usePathname();

  // Function to handle logout
  const handleLogout = () => {
    logout();
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

  return (
    <nav className="flex items-center justify-between bg-transparent px-4 py-6 text-white">
      {/* Konten Navbar (toggleSidebar, breadcrumb) */}
      <div className="flex items-center space-x-6">
        {/* Tombol Toggle Sidebar */}
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-400 transition hover:bg-gray-200 hover:text-gray-900 rounded-lg"
        >
          <Bars3Icon className="h-6 w-6" />
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
                    
                  <span className="text-gray-800 font-semibold">{breadcrumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Konten Navbar (Search, Notifikasi, Logout Button) */}
      <div className="flex items-center space-x-6 px-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Notifikasi */}
        <button className="relative p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900 rounded-lg">
          <BellIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
            3
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 rounded-lg transition focus:outline-none"
        >
          <span className="text-sm font-semibold">Log out</span>
        </button>
      </div>
    </nav>
  );
}
