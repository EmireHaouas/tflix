import React from "react";
import "./WatchedCard.css";
import { useNavigate } from "react-router-dom";
import iconCategoryMovie from "../../../assets/imgs/icon-category-movie.svg";
import iconCategoryTv from "../../../assets/imgs/icon-category-tv.svg";

const WatchedCard = ({ item }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  const navigate = useNavigate();
  const handleClick = () => {
    const mediaType = item.media_type || (item.title ? "movie" : "tv");

    navigate(`/details/${mediaType}/${item.id}`);
  };
  return (
    <>
      <div className="stdCard">
        <div
          className="upperCard"
          onClick={handleClick}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="bookmark_StdCard" onClick={null}></div>
        </div>
        <div className="lowerCard">
          <p className="title_MovieStd">{item.title || item.name}</p>
          <div className="infosSection">
            <p className="p_YearMovieStd">
              {item.release_date ? item.release_date.split("-")[0] : "N/A"}{" "}
              .{" "}
            </p>
            <img
              className="categoryIcon_Std"
              src={
                item?.media_type === "movie" || item?.title
                  ? iconCategoryMovie
                  : item?.media_type === "tv" || item?.name
                    ? iconCategoryTv
                    : iconCategoryMovie
              }
              alt="category icon"
            />

            <p className="itemTypeStd">{item.media_type}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default WatchedCard;
