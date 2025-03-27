import React, { useState, useEffect } from 'react';
import './Home.css';
import Trending from '../Trending/Trending.jsx';
import Header from '../Header/Header.jsx';
import SearchBar from "../SearchBar/SearchBar.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";
import TrendCard from "../Props/TrendCard/TrendCard.jsx";


const Home = () => {

    const apiKey = '7898561c441dbd5aa0c4b3a3677ff473'
    const [search, setSearch] = useState('');
    const [trending, setTrending] = useState([]);
    const [searchResults, setSearchResults] = useState([]);


     const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);


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

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data.Search);
            })
            .catch((error) => {
                return `Error: ${error}`;
            });

    }, [search]);



    return (
        <>
            <div className='homeContainer'>
            <Header />
            <div className='searchContainer'>
            <SearchBar value={search} onClick={handleSearch} onChange={handleSearch} />

            <Trending  trending={trending} />
              <div className='recommended'>
               {trending && trending.map((item) => (
                   <StandardCard key={item.id} item={item} className="standard-card"/>
               ))}
              </div>
            </div>
            </div>

        </>
    );
};
export default Home;