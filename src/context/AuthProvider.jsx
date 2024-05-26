import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setCurrUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    signOut(auth);
  };

  const handleSignIn = async () => {
    signInWithPopup(auth, googleProvider);
  };

  return (
    <AuthContext.Provider value={{ currUser, handleSignOut, handleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
