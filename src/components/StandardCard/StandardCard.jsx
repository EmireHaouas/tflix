import React from 'react';
import './StandardCard.css';
import iconBookmarkEmpty from "../../assets/imgs/icon-bookmark-empty.svg";
import iconCategoryMovie from "../../assets/imgs/icon-category-movie.svg";
import iconCategoryTv from "../../assets/imgs/icon-category-tv.svg";

const StandardCard = ({item}) => {
    if (!item) return null;
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    return (
        <>
            <div className='eentireCard'>
               <div className='ccard' style={{backgroundImage: `url(${imageUrl})`}}>
                    <div className='bookmark'>
                       <img className='bookmarkIcon' src={iconBookmarkEmpty} alt='bookmark icon'/>
                    </div>
               </div>

               <div className='infosTrendCard'>
                  <div className='trendCard'>
                    <p className='title_Movie'>{item.title || item.name}</p>
                  </div>

                <div className='category'>
                    <p className='p_YearMovie'>{item.release_date ? item.release_date.split('-')[0] : 'N/A'} . </p>
                    <img
                        className="categoryIcon"
                        src={item?.media_type === "movie" ? iconCategoryMovie : iconCategoryTv}
                        alt="category icon"
                    />


                    <p className='itemType'>{item.media_type}</p>

                </div>
            </div>
            </div>
        </>
    )
        ;
};
export default StandardCard;