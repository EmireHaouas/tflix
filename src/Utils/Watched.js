import { db } from "../firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";

export const addWatched = async (userId, movie) => {
  try {
    const cleanMovie = JSON.parse(JSON.stringify(movie));
    const ref = doc(db, "users", userId, "watched", String(movie.id));
    await setDoc(ref, cleanMovie);
  } catch (error) {
    throw error;
  }
};

export const removeWatched = async (userId, movieId) => {
  const ref = doc(db, "users", userId, "watched", String(movieId));
  await deleteDoc(ref);
};

export const fetchWatched = async (userId) => {
  const querySnapshot = await getDocs(
    collection(db, "users", userId, "watched"),
  );
  return querySnapshot.docs.map((doc) => doc.data());
};
