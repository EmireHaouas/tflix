import { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter, BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Home from './components/Home/Home'
import Series from './components/Series/Series.jsx';
import Movies from "./components/Movies/Movies.jsx";
import Bookmarked from "./components/Bookmarked/Bookmarked.jsx";
import MediaDetails from "./components/MediaDetails/MediaDetails.jsx";
import Login from "./components/Authentification/Login/Login.jsx";
import Register from './components/Authentification/Register/Register.jsx';
import ProfileSetup from "./components/Authentification/ProfileSetup/ProfileSetup.jsx";

function App() {
    const [bookMarked, setBookMarked] = useState(() => {
        const savedBookmarks = localStorage.getItem('bookMarked');
        return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    });

    const handleBookMark = (item) => {
        setBookMarked(prev => {
            if (prev.some(bookmark => bookmark.id === item.id)) {
                return prev.filter(bookmark => bookmark.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    useEffect(() => {
        localStorage.setItem('bookMarked', JSON.stringify(bookMarked));
    }, [bookMarked]);

    return (
        <Router basename="/tflix">
            <Routes>
                <Route path="/" element={<Home bookmarked={bookMarked} handleBookMarked={handleBookMark} />} />
                <Route path="/movies" element={<Movies bookmarked={bookMarked} handleBookMarked={handleBookMark} />} />
                <Route path="/series" element={<Series bookmarked={bookMarked} handleBookMarked={handleBookMark} />} />
                <Route path="/bookmarked" element={<Bookmarked bookmarked={bookMarked} handleBookMarked={handleBookMark} />} />
                <Route path="/details/:mediaType/:id" element={<MediaDetails bookmarked={bookMarked} handleBookMarked={handleBookMark} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profileSetup" element={<ProfileSetup />} />
            </Routes>
        </Router>
    );
}

export default App
