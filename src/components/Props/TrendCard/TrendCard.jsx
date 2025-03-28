import React from 'react';
import './TrendCard.css';
import iconBookmarkEmpty from '../../../assets/imgs/icon-bookmark-empty.svg';
import iconBookMarkFull from '../../../assets/imgs/icon-bookmark-full.svg';
import iconCategoryMovie from '../../../assets/imgs/icon-category-movie.svg';
import iconCategoryTv from '../../../assets/imgs/icon-category-tv.svg';

const TrendCard = ({item, bookmarked, handleBookMarked}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

    const isBookmarked = bookmarked.some(bookmark => bookmark.id === item.id);
    const handleBookmarkClick = () => {
        handleBookMarked(item);
        console.log(bookmarked);
    };

    return (
        <div className='card' style={{backgroundImage: `url(${imageUrl})`}}>
            <div className='bookmark' onClick={handleBookmarkClick}>
                <img className='bookmarkIcon_StdCard' src={isBookmarked ? iconBookMarkFull : iconBookmarkEmpty} alt='bookmark icon'/>
            </div>
            <div className='infosTrendCard'>
                <p className='p_YearMovie'>{item.release_date ? item.release_date.split('-')[0] : 'N/A'} . </p>
                <div className='category'>
                    <img
                        className="categoryIcon"
                        src={item?.media_type === "movie" ? iconCategoryMovie : iconCategoryTv}
                        alt="category icon"
                    />
                    <p className='itemType'>{item.media_type}</p>
                </div>
            </div>
            <div className='trendCard'>
                <p className='title_Movie'>{item.title || item.name}</p>
            </div>
        </div>
    );
};

export default TrendCard;