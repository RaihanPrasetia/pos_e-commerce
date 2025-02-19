'use client';

import SlideCheckbox from "@/components/checkbox/SlideCheckbox";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { TextField } from "@mui/material";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("12345678");
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const handleCheckboxChange = (event: any) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            login(data.token, data.user);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-cover bg-center flex items-center justify-center px-16 bg-gradient-to-r">
            <div className="flex w-2/3 justify-end h-[400px] px-24">
                <div className="w-full rounded-2xl">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Enter your email and password to sign in
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="flex items-center mb-4">
                            <SlideCheckbox
                                id="rememberMe"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                label="Remember me"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 font-bold text-white bg-utama hover:brightness-105 rounded-md text-sm"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                    <p className="text-center mt-4 text-sm text-gray-600">
                        Don&apos;t have an account? {" "}
                        <a href="#" className="text-violet-500 hover:text-violet-600 font-medium">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
            <div className="hidden lg:flex w-full h-[100vh] p-4">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-cover bg-center bg-[url('/assets/img/avatar/login2.png')]">
                    <div className="absolute inset-0 bg-utama opacity-70"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                        <h4 className="text-lg font-bold text-white mb-4">&quot;Attention is the new currency&quot;</h4>
                        <p className="text-sm text-white">
                            The more effortless the writing looks, the more effort the writer actually put into the process.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
