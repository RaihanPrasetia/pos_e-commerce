"use client";

import SlideCheckbox from "@/components/checkbox/SlideCheckbox";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth hook

export default function Login() {
  const { login } = useAuth(); // Get login method from AuthContext
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // For handling loading state
  const [error, setError] = useState<string | null>(null); // For handling errors

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Reset errors before trying login

    try {
      // Pass dummy credentials (example email and password)
      await login("dummy-token", { id: "1", name: "User", email, password });

    } catch (err) {
      setError(`${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cover bg-center gap-10 px-16 bg-gradient-to-r flex items-center justify-center transition-all duration-200">
      {/* Form Login */}
      <div className="flex  w-2/3 justify-end h-[400px] px-24">
        <div className="w-full rounded-2xl">
          <h4 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Enter your email and password to sign in
          </p>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
                required
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-4">
              <SlideCheckbox
                id="rememberMe"
                checked={isChecked}
                onChange={handleCheckboxChange}
                label="Remember me"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 font-bold text-white bg-violet-500 hover:bg-violet-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-violet-500 hover:text-violet-600 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Gambar di Sebelah */}
      <div className="hidden lg:flex w-full h-[100vh] p-4">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-cover bg-center bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')]">
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-500 to-violet-500 opacity-70"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h4 className="text-lg font-bold text-white mb-4">
              &quot;Attention is the new currency&quot;
            </h4>
            <p className="text-sm text-white">
              The more effortless the writing looks, the more effort the
              writer actually put into the process.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
