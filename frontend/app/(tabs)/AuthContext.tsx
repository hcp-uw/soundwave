import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'; // your Firebase setup file

interface AuthContextType {
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // cleanup listener when component unmounts
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
