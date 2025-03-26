import React, { useState, useEffect } from 'react';
import './Home.css';
import Trending from '../Trending/Trending.jsx';
import Header from '../Header/Header.jsx';
import SearchBar from "../SearchBar/SearchBar.jsx";


const Home = () => {

    const apiKey = '7898561c441dbd5aa0c4b3a3677ff473'

    const [search, setSearch] = useState('');
    const [trending, setTrending] = useState([]);
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            setTrending(data.results);
        })
        .catch((error) => {
            return `Error: ${error}`;
        });
}, []);



    return (
        <>
            <Header />
            <SearchBar value={search} onClick={handleSearch} />
            <Trending trending={trending} />
            <p>{search}</p>
        </>
    );
};
export default Home;