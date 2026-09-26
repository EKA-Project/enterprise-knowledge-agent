import { createContext, useState } from "react";

// Shared authentication and user-role state
const AuthContext = createContext(null);

// Provides authentication state to child components
export function AuthProvider({ children }) {
  const [activeRole, setActiveRole] = useState("Employee");

  return (
    <AuthContext.Provider value={{ activeRole, setActiveRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;