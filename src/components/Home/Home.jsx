import React, { useState, useEffect } from 'react';
import './Home.css';
import Trending from '../Trending/Trending.jsx';
import Header from '../Header/Header.jsx';
import SearchBar from "../SearchBar/SearchBar.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";

const Home = ({bookmarked, handleBookMarked} ) => {
    const apiKey = '7898561c441dbd5aa0c4b3a3677ff473';
    const [searchAnyResults, setSearchAnyResults] = useState([]);
    const [search, setSearch] = useState('');
    const [trending, setTrending] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Api request to get trending movies and series
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=fr-FR`)
            .then((response) => response.json())
            .then((data) => {
                setTrending(data.results);
            })
            .catch((error) => {
                return `Error: ${error}`;
            });
    }, []);

    // Api request to get search any results
    useEffect(() => {
        const timeoutIdSearchAny = setTimeout(() => {
            if (search) {
                setIsSearching(true);
                fetch(`https://api.themoviedb.org/3/search/multi?query=${search}&api_key=${apiKey}&language=fr-FR`)
                    .then((response) => response.json())
                    .then((data) => {
                        setSearchAnyResults(data.results || []);
                        setIsSearching(false);
                        setHasSearched(true);
                    })
                    .catch((error) => {
                        console.error(`Error: ${error}`);
                        setIsSearching(false);
                        setHasSearched(true);
                    });
            } else {
                setSearchAnyResults([]);
                setIsSearching(false);
                setHasSearched(false);
            }
        },300);
        return () => clearTimeout(timeoutIdSearchAny);
    }, [search]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearch(value);
    };

    return (
        <>
            <div className='homeContainer'>
                <Header />
                <div className='searchContainer'>
                    <SearchBar value={search} onClick={handleSearch} onChange={handleSearch} placeholder='Search for movies or TV series'/>
                    {search && searchAnyResults.length > 0 && (
                        <div className='searchResults'>
                            <h2 className='recomendedH2'>Search Results</h2>
                            <div className='recommended'>
                                {searchAnyResults.map((item) => (
                                    <StandardCard
                                        key={item.id}
                                        item={item}
                                        bookmarked={bookmarked}
                                        handleBookMarked={handleBookMarked}
                                        className="standard-card"/>
                                ))}
                            </div>
                        </div>
                    )}
                    {search && hasSearched && !isSearching && searchAnyResults.length === 0 && (
                        <p className='noResultsMessage'>No movies or series found for « {search} »</p>
                    )}

                    {!search && trending.length > 0 && (
                        <>
                            <Trending trending={trending} bookmarked={bookmarked} handleBookMarked={handleBookMarked}/>
                            <h2 className='recomendedH2'>Recommended for you</h2>
                            <div className='recommended'>
                                {trending.map((item) => (
                                    <StandardCard key={item.id} item={item} bookmarked={bookmarked} handleBookMarked={handleBookMarked} className="standard-card"/>
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