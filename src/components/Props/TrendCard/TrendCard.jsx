import React from 'react';
import './TrendCard.css';
import iconBookmarkEmpty from '../../../assets/imgs/icon-bookmark-empty.svg';
import iconBookMarkFull from '../../../assets/imgs/icon-bookmark-full.svg';

const TrendCard = () => {
    return(
        <>
            <div className='infosTrendCard'>
                <p>Date</p>
                <p>Media Type</p>
                </div>
            <div className='trendCard'>
                <p>Title</p>
            </div>
        </>
    );
};