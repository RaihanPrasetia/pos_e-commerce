"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
	const router = useRouter();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (isLoading) return; // Tunggu hingga loading selesai

		if (user) {
			router.replace("/dashboard"); // Jika login, arahkan ke dashboard
		} else {
			router.replace("/login"); // Jika tidak login, arahkan ke login
		}
	}, [user, isLoading, router]);

	return <div className="flex items-center justify-center min-h-screen text-lg">Loading...</div>;
}
