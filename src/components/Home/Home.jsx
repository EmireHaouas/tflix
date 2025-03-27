import React, { useState, useEffect } from 'react';
import './Home.css';
import Trending from '../Trending/Trending.jsx';
import Header from '../Header/Header.jsx';
import SearchBar from "../SearchBar/SearchBar.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";
import TrendCard from "../Props/TrendCard/TrendCard.jsx";


const Home = () => {

    const apiKey = '7898561c441dbd5aa0c4b3a3677ff473'

    const [searchAnyResults, setSearchAnyResults] = useState([]);
    const [search, setSearch] = useState('');

    const [trending, setTrending] = useState([]);





// Api request to get trending movies
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

     // Api request to get search results
    useEffect(() => {
        if (search) {
            fetch(`https://api.themoviedb.org/3/search/multi?query=${search}&api_key=${apiKey}
`)
                .then((response) => response.json())
                .then((data) => {
                    setSearchAnyResults(data.results || []);
                })
                .catch((error) => {
                    console.error(`Error: ${error}`);
                });
        } else {
            setSearchAnyResults([]);
        }
    }, [search]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
    }



    return (
        <>
            <div className='homeContainer'>
            <Header />

                <div className='searchContainer'>
                    <SearchBar value={search} onClick={handleSearch} onChange={handleSearch}/>
                    {search && searchAnyResults.length > 0 && (
                        <div className='searchResults'>
                            <h2 className='recomendedH2'>Search Results</h2>
                            <div className='recommended'>
                                {searchAnyResults.map((item) => (
                                    <StandardCard key={item.id} item={item} className="standard-card"/>
                                ))}
                            </div>
                        </div>
                    )}
                    {!search && trending.length > 0 && (
                        <>
                    <Trending trending={trending}/>
                    <h2 className='recomendedH2'>Recommended for you</h2>
                    <div className='recommended'>


                        {trending && trending.map((item) => (
                            <StandardCard key={item.id} item={item} className="standard-card"/>
                        ))}

                    </div>
                        </>
            )}
                </div>



            </div>

        </>
    );
};
export default Home;