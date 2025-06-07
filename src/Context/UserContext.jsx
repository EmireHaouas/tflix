import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const cachedProfile = localStorage.getItem("userProfile");
    if (cachedProfile) {
      setProfile(JSON.parse(cachedProfile));
      setLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);

      if (currentUser) {
        try {
          const ref = doc(db, "users", currentUser.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            const data = snap.data();
            setProfile(data);
            localStorage.setItem("userProfile", JSON.stringify(data));
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setProfile(null);
        localStorage.removeItem("userProfile");
        setLoadingProfile(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, profile, loadingUser, loadingProfile, setProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
