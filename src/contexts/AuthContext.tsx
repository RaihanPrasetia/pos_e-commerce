// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define the shape of your authentication context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: string; // Example of extending with additional fields
}

// Initialize the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider to wrap your application
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Simulating checking for user on initial render (e.g., via cookies or localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User): boolean => {
  // Simulating login success with dummy credentials
  if (userData.email === "admin@example.com" && userData.password === "password") {
    // Simulate storing token and user data
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Set the user in state
    router.push("/dashboard"); // Redirect to the dashboard after successful login
    return true;
  } else {
    return false; // Login failed for incorrect credentials
  }
};

  const logout = () => {
    // Clear the stored token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
