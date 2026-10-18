import { createContext, useEffect, useState } from "react";

// Shared authentication and user-role state
const AuthContext = createContext(null);
// TEMP: placeholder until there's a real user object. Must match a `value` in documentCategories.
const MOCK_DEPARTMENT = "Engineering & DevOps";
// Provides authentication state to child components
export function AuthProvider({ children }) {
  const [activeRole, setActiveRole] = useState(
    () => localStorage.getItem("eka-role") || "Employee",
  );

  useEffect(() => localStorage.setItem("eka-role", activeRole), [activeRole]);

  return (
    <AuthContext.Provider
      value={{ activeRole, setActiveRole, department: MOCK_DEPARTMENT }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
