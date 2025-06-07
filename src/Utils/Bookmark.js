import { db } from "../firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export const addBookmark = async (userId, movie) => {
  const ref = doc(db, "users", userId, "bookmarks", String(movie.id));
  await setDoc(ref, movie);
};

export const removeBookmark = async (userId, movieId) => {
  const ref = doc(db, "users", userId, "bookmarks", String(movieId));
  await deleteDoc(ref);
};

export const fetchBookmarks = async (userId) => {
  const querySnapshot = await getDocs(
    collection(db, "users", userId, "bookmarks"),
  );
  return querySnapshot.docs.map((doc) => doc.data());
};
