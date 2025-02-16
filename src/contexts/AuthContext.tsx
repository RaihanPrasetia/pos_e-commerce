import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userType } from "@/type/userTypes";

// Tipe data untuk konteks autentikasi
interface AuthContextType {
  isAuth: boolean
  user: userType | null;
  isLoading: boolean;
  login: (token: string, userData: userType) => void;
  logout: () => void;
}

// Inisialisasi Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider untuk membungkus aplikasi
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState<userType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as userType);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: userType) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuth(true)
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuth(false)
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
