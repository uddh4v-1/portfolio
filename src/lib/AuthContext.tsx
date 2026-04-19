// import React, { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoadingAuth, setIsLoadingAuth] = useState(true);

//   useEffect(() => {
//     checkUserAuth();
//   }, []);

//   // 🔹 Replace this with your real API later
//   const checkUserAuth = async () => {
//     try {
//       setIsLoadingAuth(true);

//       // Example: check token from localStorage
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setUser(null);
//         setIsAuthenticated(false);
//       } else {
//         // 🔸 Replace with real API call
//         // const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` }});
//         // const data = await res.json();

//         const fakeUser = { id: 1, name: "Demo User" }; // temp
//         setUser(fakeUser);
//         setIsAuthenticated(true);
//       }
//     } catch (error) {
//       console.error("Auth check failed:", error);
//       setUser(null);
//       setIsAuthenticated(false);
//     } finally {
//       setIsLoadingAuth(false);
//     }
//   };

//   const login = async (userData) => {
//     // 🔹 Replace with real login logic
//     localStorage.setItem("token", "dummy-token");
//     setUser(userData);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         isLoadingAuth,
//         login,
//         logout,
//         checkUserAuth,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };