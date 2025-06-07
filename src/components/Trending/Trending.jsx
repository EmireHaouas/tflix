import React from "react";
import "./Trending.css";
import TrendCard from "../Props/TrendCard/TrendCard.jsx";

const Trending = ({ trending, bookmarked, handleBookMarked }) => {
  return (
    <>
      <div className="trending">
        <h2 className="h2Trending">Trending</h2>
        <div className="trendCards">
          {trending.map((item) => (
            <TrendCard
              key={item.id}
              item={item}
              bookmarked={bookmarked}
              handleBookMarked={handleBookMarked}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
