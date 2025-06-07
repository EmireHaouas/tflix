import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Series.css";
import Header from "../header/Header.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";
import { useUser } from "../../Context/UserContext.jsx";
import { getUserLanguage, getUserRegion } from "../../Utils/apiConfig.js";

const Series = ({ bookmarked, handleBookMarked }) => {
  const apiKey = "7898561c441dbd5aa0c4b3a3677ff473";

  const [trendingSeries, setTrendingSeries] = useState([]);
  const [searchSerieResults, setSearchSerieResults] = useState([]);
  const [searchSerieParams, setSearchParams] = useSearchParams();
  const [searchSerie, setSearchSerie] = useState(
    searchSerieParams.get("q") || "",
  );
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { profile, loading } = useUser();

  // ➤ Trending Series
  useEffect(() => {
    if (loading) return;

    const lang = profile ? getUserLanguage(profile) : "en-US";
    const region = profile ? getUserRegion(profile) : "US";

    fetch(
      `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=${lang}&region=${region}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setTrendingSeries(data.results);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }, [loading, profile]);

  // ➤ Search Series
  useEffect(() => {
    if (loading) return;

    const lang = profile ? getUserLanguage(profile) : "en-US";
    const region = profile ? getUserRegion(profile) : "US";

    const timeoutId = setTimeout(() => {
      if (searchSerie) {
        setIsSearching(true);
        fetch(
          `https://api.themoviedb.org/3/search/tv?query=${searchSerie}&api_key=${apiKey}&language=${lang}&region=${region}`,
        )
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

    return () => clearTimeout(timeoutId);
  }, [searchSerie, loading, profile]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchSerie(value);
    setSearchParams(value ? { q: value } : {});
  };

  return (
    <>
      <Header />
      <div className="searchContainer">
        <SearchBar
          value={searchSerie}
          onChange={handleSearch}
          onClick={handleSearch}
          placeholder="Search for TV series"
        />

        {searchSerie && searchSerieResults.length > 0 && (
          <div className="searchResults">
            <h2 className="recomendedH2">Search Results</h2>
            <div className="recommended">
              {searchSerieResults.map((item) => (
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

        {searchSerie &&
          hasSearched &&
          !isSearching &&
          searchSerieResults.length === 0 && (
            <p className="noResultsMessage">
              No series found for « {searchSerie} »
            </p>
          )}

        {!searchSerie && (
          <div className="trendingMoviesSection">
            <h2 className="recomendedMoviesH2">Series</h2>
            <div className="recommendedMovies">
              {trendingSeries.map((item) => (
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

export default Series;
