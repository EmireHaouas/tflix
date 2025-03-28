import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from "../header/Header.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";
import Trending from "../Trending/Trending.jsx";

const Movies = ({bookmarked, handleBookMarked}) => {
    const apiKey = '7898561c441dbd5aa0c4b3a3677ff473'
    const [trendingMovies, setTrendingMovies] = useState([]);

    const [searchMovieResults, setSearchMovieResults] = useState([]);
    const [searchMovie, setSearchMovie] = useState('');

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                setTrendingMovies(data.results);
            })
            .catch((error) => {
                return `Error: ${error}`;
            });
    }, []);
    // Api request to get search results
    useEffect(() => {
        if (searchMovie) {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=${apiKey}`)
                .then((response) => response.json())
                .then((data) => {
                    setSearchMovieResults(data.results || []);
                })
                .catch((error) => {
                    console.error(`Error: ${error}`);
                });
        } else {
            setSearchMovieResults([]);
        }
    }, [searchMovie]);



    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchMovie(value);
    }
    return(
        <>
            <Header/>
            <SearchBar value={searchMovie} onChange={handleSearch} onClick={handleSearch}/>

            {searchMovie && searchMovieResults.length > 0 && (
                <div className='searchResults'>
                    <h2 className='recomendedH2'>Search Results</h2>
                    <div className='recommended'>
                        {searchMovieResults.map((item) => (
                            <StandardCard key={item.id} item={item} bookmarked={bookmarked} handleBookMarked={handleBookMarked} className="standard-card"/>
                        ))}
                    </div>
                </div>
            )}

            <div className='trendingMoviesSection'>
                <h2 className='recomendedMoviesH2'>Movies</h2>
                <div className='recommendedMovies'>
                    {trendingMovies && trendingMovies.map((item) => (
                        <StandardCard key={item.id} item={item} bookmarked={bookmarked} handleBookMarked={handleBookMarked} className="standard-card"/>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Movies;