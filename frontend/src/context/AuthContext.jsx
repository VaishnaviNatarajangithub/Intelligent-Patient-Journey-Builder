// src/context/AuthContext.jsx
import { createContext, useState } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  // Role can be: "Doctor", "Patient", "Admin"
  const [role, setRole] = useState(null);  
  const [token, setToken] = useState(null);

  // login function (you can call this after authentication)
  const login = (userRole, userToken) => {
    setRole(userRole);
    setToken(userToken);
  };

  // logout function
  const logout = () => {
    setRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
