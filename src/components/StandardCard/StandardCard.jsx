import React from 'react';
import './StandardCard.css';
import iconBookmarkEmpty from "../../assets/imgs/icon-bookmark-empty.svg";
import iconBookmarkFull from "../../assets/imgs/icon-bookmark-full.svg";
import iconCategoryMovie from "../../assets/imgs/icon-category-movie.svg";
import iconCategoryTv from "../../assets/imgs/icon-category-tv.svg";
import {useNavigate} from "react-router-dom";

const StandardCard = ({item, bookmarked, handleBookMarked, variant}) => {
    if (!item) return null;
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    const navigate = useNavigate();
    const isBookmarked = bookmarked.some(bookmark => bookmark.id === item.id);
    const handleBookmarkClick = (e) => {
        e.stopPropagation();
        handleBookMarked(item);
        console.log(bookmarked);
    };
    const handleClick = () => {
        const mediaType = item.media_type || (item.title ? 'movie' : 'tv');

        navigate(`/details/${mediaType}/${item.id}`);


    };

    return (
        <>
            <div className={`stdCard ${variant ? `stdCard--${variant}` : ''}`}>
                <div className='upperCard' onClick={handleClick} style={{backgroundImage: `url(${imageUrl})`}}>
                    <div className='bookmark_StdCard' onClick={handleBookmarkClick}>
                        <img className='bookmarkIcon_StdCard' src={isBookmarked ? iconBookmarkFull : iconBookmarkEmpty} alt='bookmark icon'/>
                    </div>
                </div>
                <div className='lowerCard'>
                    <p className='title_MovieStd'>{item.title || item.name}</p>
                    <div className='infosSection'>
                        <p className='p_YearMovieStd'>{item.release_date ? item.release_date.split('-')[0] : 'N/A'} . </p>
                        <img
                            className="categoryIcon_Std"
                            src={item?.media_type === "movie" ? iconCategoryMovie : iconCategoryTv}
                            alt="category icon"
                        />
                        <p className='itemTypeStd'>{item.media_type}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StandardCard;