import React, { useState, useEffect } from 'react';
import './Series.css';
import Header from "../header/Header.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";

const Series = ({bookmarked, handleBookMarked}) => {
    const apiKey = '7898561c441dbd5aa0c4b3a3677ff473'
    const [trendingSeries, setTrendingSeries] = useState([]);
    const [searchSerieResults, setSearchSerieResults] = useState([]);
    const [searchSerie, setSearchSerie] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Api request to get trending series
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                setTrendingSeries(data.results);
            })
            .catch((error) => {
                return `Error: ${error}`;
            });
    }, []);

    // Api request to get search results
    useEffect(() => {
        const timeoutIdSearchSeries = setTimeout(() => {
            if (searchSerie) {
                setIsSearching(true);
                fetch(`https://api.themoviedb.org/3/search/tv?query=${searchSerie}&api_key=${apiKey}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setSearchSerieResults(data.results || []);
                        setIsSearching(false);
                        setHasSearched(true);
                    })
                    .catch((error) => {
                        console.error(`Error: ${error}`);
                        setIsSearching(false);
                        setHasSearched(true);
                    });
            } else {
                setSearchSerieResults([]);
                setIsSearching(false);
                setHasSearched(false);
            }
        }, 300);
        return () => clearTimeout(timeoutIdSearchSeries);
        }, [searchSerie]);



    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchSerie(value);
    }
    return(
        <>
            <Header/>
            <div className='searchContainer'>
            <SearchBar value={searchSerie} onChange={handleSearch} onClick={handleSearch} placeholder='Search for TV series'/>

            {searchSerie && searchSerieResults.length > 0 && (
                <div className='searchResults'>
                    <h2 className='recomendedH2'>Search Results</h2>
                    <div className='recommended'>
                        {searchSerieResults.map((item) => (
                            <StandardCard key={item.id}
                            item={item}
                            bookmarked={bookmarked}
                            handleBookMarked={handleBookMarked}
                            className="standard-card"/>
                        ))}
                    </div>
                </div>
            )}
                {searchSerie && hasSearched && !isSearching && searchSerieResults.length === 0 && (
                    <p className='noResultsMessage'>No series found for « {searchSerie} »</p>
                )}

                {!searchSerie && (
            <div className='trendingMoviesSection'>
                <h2 className='recomendedMoviesH2'>Series</h2>
                <div className='recommendedMovies'>
                    {trendingSeries && trendingSeries.map((item) => (
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
            </div>
        </>
    )
}
export default Series;