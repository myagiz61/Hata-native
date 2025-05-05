import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

// 1. Context oluştur
export const UserContext = createContext();

// 2. Provider bileşeni
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("👀 Firebase oturum kontrolü başlatılıyor...");
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("✅ Oturum açık, kullanıcı bulundu:", firebaseUser.email);
        setUser(firebaseUser);
      } else {
        console.log("🚪 Kullanıcı çıkış yaptı veya oturum yok");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
