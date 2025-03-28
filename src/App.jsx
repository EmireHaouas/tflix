import { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Home from './components/Home/Home'
import Series from './components/Series/Series.jsx';
import Movies from "./components/Movies/Movies.jsx";
import Bookmarked from "./components/Bookmarked/Bookmarked.jsx";

function App() {
    const [bookMarked, setBookMarked] = useState(() => {
        // Récupérer les favoris du localStorage au chargement initial
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
        // Sauvegarder les favoris dans le localStorage à chaque changement
        localStorage.setItem('bookMarked', JSON.stringify(bookMarked));
    }, [bookMarked]);

  return (
    <>
        <Router>
            <Routes>
              <Route path="/" element={<Home bookmarked={bookMarked} handleBookMarked={handleBookMark} />}></Route>
              <Route path="/movies" element={<Movies bookmarked={bookMarked} handleBookMarked={handleBookMark}/>}></Route>
              <Route path="/series" element={<Series bookmarked={bookMarked} handleBookMarked={handleBookMark}/>}></Route>
              <Route path="/bookmarked" element={<Bookmarked bookmarked={bookMarked} handleBookMarked={handleBookMark}/>}></Route>
           </Routes>

        </Router>

    </>
  )
}

export default App
