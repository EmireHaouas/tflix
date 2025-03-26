import React from 'react';
import './TrendCard.css';
import iconBookmarkEmpty from '../../../assets/imgs/icon-bookmark-empty.svg';
import iconBookMarkFull from '../../../assets/imgs/icon-bookmark-full.svg';
import iconCategoryMovie from '../../../assets/imgs/icon-category-movie.svg';
import iconCategoryTv from '../../../assets/imgs/icon-category-tv.svg';

const TrendCard = ({item}) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

    return (
        <div className='card' style={{backgroundImage: `url(${imageUrl})`}}>
            <div className='bookmark'>
            <img className='bookmarkIcon' src={iconBookmarkEmpty} alt='bookmark icon'/>
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