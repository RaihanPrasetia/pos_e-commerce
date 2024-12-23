"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const { user, isLoading } = useAuth(); // Get user and loading status from context

	useEffect(() => {
		if (isLoading) return; // If loading, wait for user state to load

		if (user) {
			// Jika user sudah terautentikasi, langsung arahkan ke /dashboard
			router.push("/dashboard");
		} else {
			// Jika user belum terautentikasi, arahkan ke /login
			router.push("/login");
		}
	}, [user, isLoading, router]);

	if (isLoading) {
		return <div>Loading...</div>; // Optionally, show loading screen while fetching user state
	}

	// Since redirection happens in useEffect, no need for return here
	return null; // Render nothing while redirecting
}
