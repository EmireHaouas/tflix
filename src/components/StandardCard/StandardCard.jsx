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
            <div className='stdCard'>
               <div className='upperCard' style={{backgroundImage: `url(${imageUrl})`}}>
                    <div className='bookmark_StdCard'>
                       <img className='bookmarkIcon_StdCard' src={iconBookmarkEmpty} alt='bookmark icon'/>
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
    )
        ;
};
export default StandardCard;