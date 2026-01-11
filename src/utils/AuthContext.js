import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW
  const [activePage,setActivePage] = useState('Home');


  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      setUser({ ...JSON.parse(userDetails) });
    } 

    setLoading(false); // done checking
  }, [activePage]);

  return (
    <AuthContext.Provider value={{ user, setUser,activePage,setActivePage, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
