import { createContext, useState } from "react";
import { USERS } from "./assets/students";

// Create Context
const AuthContext = createContext(null);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = (email, password) => {
    const found = USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      setUser(found);
      setError("");
      return true;
    }

    setError("Invalid email or password.");
    return false;
  };

  const googleLogin = () => {
    // Simulated Google OAuth
    setUser({
      id: 99,
      name: "Google User (Demo)",
      email: "google@demo.edu",
      role: "admin",
      avatar: "GU",
    });
    setError("");
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, googleLogin, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export context for custom hook
export { AuthContext };