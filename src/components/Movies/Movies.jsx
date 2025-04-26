import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Movies.css';
import Header from "../header/Header.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";

const Movies = ({ bookmarked, handleBookMarked }) => {
    const apiKey = '7898561c441dbd5aa0c4b3a3677ff473'
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [searchMovieResults, setSearchMovieResults] = useState([]);
    const [searchMovieParams, setSearchParams] = useSearchParams();
    const [searchMovie, setSearchMovie] = useState(searchMovieParams.get('q') || '');
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Api request to get trending movies
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                setTrendingMovies(data.results);
            })
            .catch((error) => {
                console.error(`Error: ${error}`);
            });
    }, []);

    // Api request to get search results
    useEffect(() => {
        const timeoutIdSearchMovies = setTimeout(() => {
            if (searchMovie) {
                setIsSearching(true);
                fetch(`https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=${apiKey}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setSearchMovieResults(data.results || []);
                        setIsSearching(false);
                        setHasSearched(true);  // La recherche est terminée
                    })
                    .catch((error) => {
                        console.error(`Error: ${error}`);
                        setIsSearching(false);
                        setHasSearched(true);
                    });
            } else {
                setSearchMovieResults([]);
                setIsSearching(false);
                setHasSearched(false);
            }
        }, 300);
        return () => clearTimeout(timeoutIdSearchMovies);
    }, [searchMovie]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchMovie(value);
        setSearchParams(value ? { q: value } : {});
    };

    return (
        <>
            <Header />
            <div className='searchContainer'>
                <SearchBar value={searchMovie} onChange={handleSearch} placeholder='Search for movies' />


                {searchMovie && searchMovieResults.length > 0 && (
                    <div className='searchResults'>
                        <h2 className='recomendedH2'>Search Results</h2>
                        <div className='recommended'>
                            {searchMovieResults.map((item) => (
                                <StandardCard
                                    key={item.id}
                                    item={item}
                                    bookmarked={bookmarked}
                                    handleBookMarked={handleBookMarked}
                                    className="standard-card"
                                />
                            ))}
                        </div>
                    </div>
                )}


                {searchMovie && hasSearched && !isSearching && searchMovieResults.length === 0 && (
                    <p className='noResultsMessage'>No movies found for « {searchMovie} »</p>
                )}


                {!searchMovie && (
                    <div className='trendingMoviesSection'>
                        <h2 className='recomendedMoviesH2'>Movies</h2>
                        <div className='recommendedMovies'>
                            {trendingMovies.map((item) => (
                                <StandardCard
                                    key={item.id}
                                    item={item}
                                    bookmarked={bookmarked}
                                    handleBookMarked={handleBookMarked}
                                    className="standard-card"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Movies;