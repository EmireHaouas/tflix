import React, { useState, useEffect } from "react";
import "./UserAnalytics.css";

const UserAnalytics = ({ watched = [] }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const movies = watched.filter((item) => item?.media_type === "movie");
  const tv = watched.filter((item) => item?.media_type === "tv");

  const frequences = {};

  watched.forEach((item) => {
    if (item.genres && Array.isArray(item.genres)) {
      item.genres.forEach((genre) => {
        const genreName = genre.name;
        frequences[genreName] = (frequences[genreName] || 0) + 1;
      });
    }
  });

  const genresTries = Object.keys(frequences).sort((a, b) => {
    const diff = frequences[b] - frequences[a];
    if (diff === 0) {
      return a.localeCompare(b);
    }
    return diff;
  });

  const topGenres = genresTries.slice(0, 5);
  const maxFreq = Math.max(...Object.values(frequences), 1);

  const totalMedia = movies.length + tv.length;
  const moviesPercentage = totalMedia > 0 ? (movies.length / totalMedia) * 100 : 0;
  const tvPercentage = totalMedia > 0 ? (tv.length / totalMedia) * 100 : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <p className="uAnalyticsTitle">My Statistics</p>
      <div className="statsContainer">
        <div className="statsRow">
          <p className="statLabel">Total watched:</p>
          <p className="statValue">{watched.length}</p>
        </div>
        <div className="statsRow">
          <p className="statLabel">Movies:</p>
          <p className="statValue">{movies.length}</p>
        </div>
        <div className="statsRow">
          <p className="statLabel">TV Shows:</p>
          <p className="statValue">{tv.length}</p>
        </div>
        {totalMedia > 0 && (
          <div className="pieChartSection">
            <p className="pieChartTitle">Movies vs TV Shows</p>
            <div className="pieChartContainer">
              <div
                className={`pieChart ${isAnimated ? "animated" : ""}`}
                style={{
                  background: `conic-gradient(
                    #ffd700 0% ${moviesPercentage}%,
                    #fc4747 ${moviesPercentage}% 100%
                  )`,
                }}
              >
                <div className="pieChartCenter">
                  <span className="pieChartPercentage">
                    {Math.round(moviesPercentage)}%
                  </span>
                </div>
              </div>
              <div className="pieChartLegend">
                <div className="legendItem">
                  <div className="legendColor" style={{ background: "#ffd700" }}></div>
                  <span className="legendLabel">Movies: {movies.length}</span>
                </div>
                <div className="legendItem">
                  <div className="legendColor" style={{ background: "#fc4747" }}></div>
                  <span className="legendLabel">TV Shows: {tv.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {topGenres.length > 0 && (
          <div className="genresSection">
            <p className="genresTitle">Top Genres</p>
            {topGenres.map((genre, index) => {
              const percentage = (frequences[genre] / maxFreq) * 100;
              const rank = index + 1;
              return (
                <div key={genre} className="genreItem">
                  <div className="genreHeader">
                    <div className="genreLeft">
                      <span className="genreRank">#{rank}</span>
                      <span className="genreName">{genre}</span>
                    </div>
                  </div>
                  <div className="genreBarWrapper">
                    <div
                      className={`genreBar ${isAnimated ? "animated" : ""}`}
                      style={{
                        width: isAnimated ? `${percentage}%` : "0%",
                        transitionDelay: `${index * 0.1}s`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default UserAnalytics;
