import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { addBookmark, removeBookmark, fetchBookmarks } from "./utils/bookmark";
import { useUser, UserProvider } from "./context/UserContext";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import Home from "./components/Home/Home";
import Series from "./components/Series/Series.jsx";
import Movies from "./components/Movies/Movies.jsx";
import Bookmarked from "./components/Bookmarked/Bookmarked.jsx";
import MediaDetails from "./components/MediaDetails/MediaDetails.jsx";
import Login from "./components/Authentification/Login/Login.jsx";
import Register from "./components/Authentification/Register/Register.jsx";
import ProfileSetup from "./components/Authentification/ProfileSetup/ProfileSetup.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ResetPassword from "./components/Authentification/ResetPassword/ResetPassword.jsx";
import UserAnalytics from "./components/UserAnalytics/UserAnalytics.jsx";
import { fetchWatched, addWatched, removeWatched } from "./Utils/Watched.js";

function AppInner() {
  const { user } = useUser();
  const [bookmarked, setBookMarked] = useState([]);
  const [watched, setWatched] = useState([]);

  const handleBookMark = (item) => {
    if (!user) return;

    const isBookmarked = bookmarked.some((b) => b.id === item.id);

    setBookMarked((prev) =>
      isBookmarked ? prev.filter((b) => b.id !== item.id) : [...prev, item],
    );

    if (isBookmarked) {
      removeBookmark(user.uid, item.id).catch(() => {
        setBookMarked((prev) => [...prev, item]);
      });
    } else {
      addBookmark(user.uid, item).catch(() => {
        setBookMarked((prev) => prev.filter((b) => b.id !== item.id));
      });
    }
  };
  const handleWatched = (item) => {
    if (!user) return;

    const isWatched = watched.some((w) => w && w.id === item.id);

    setWatched(
      (prev) =>
        isWatched ? prev.filter((w) => w && w.id !== item.id) : [...prev, item],
      console.log(watched),
    );

    if (isWatched) {
      removeWatched(user.uid, item.id).catch(() => {
        setWatched((prev) => [...prev, item]);
      });
    } else {
      addWatched(user.uid, item).catch(() => {
        setWatched((prev) => prev.filter((w) => w && w.id !== item.id));
      });
    }
  };

  useEffect(() => {
    if (!user) return;

    (async () => {
      const bookmarks = await fetchBookmarks(user.uid);
      setBookMarked(bookmarks);
    })();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const watched = await fetchWatched(user.uid);
      const validWatched = watched.filter((item) => item != null);
      setWatched(validWatched);
    })();
  }, [user]);
  return (
    <Router basename="/tflix">
      <Routes>
        <Route
          path="/"
          element={
            <Home bookmarked={bookmarked} handleBookMarked={handleBookMark} />
          }
        />
        <Route
          path="/movies"
          element={
            <Movies bookmarked={bookmarked} handleBookMarked={handleBookMark} />
          }
        />
        <Route
          path="/series"
          element={
            <Series bookmarked={bookmarked} handleBookMarked={handleBookMark} />
          }
        />
        <Route
          path="/details/:mediaType/:id"
          element={
            <MediaDetails
              bookmarked={bookmarked}
              handleBookMark={handleBookMark}
              handleWatched={handleWatched}
              watched={watched}
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <UserAnalytics
              watched={watched}
              handleBookMarked={handleBookMark}
              bookMarked={bookmarked}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profileSetup" element={<ProfileSetup />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        <Route
          path="/bookmarked"
          element={
            <PrivateRoute>
              <Bookmarked
                bookmarked={bookmarked}
                handleBookMarked={handleBookMark}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile watched={watched} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppInner />
    </UserProvider>
  );
}

export default App;
