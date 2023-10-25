import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const storedSession = localStorage.getItem("userSession");
    return storedSession ? JSON.parse(storedSession) : {};
  });
  const [authenticated, setAuthenticated] = useState(() => {
    const storedSession = localStorage.getItem("userSession");
    return storedSession !== null;
  });

  const value = {
    session,
    setSession,
    authenticated,
    setAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
