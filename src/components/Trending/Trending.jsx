import React from 'react';
import './Trending.css';
import TrendCard from '../Props/TrendCard/TrendCard.jsx';
import StandardCard from "../StandardCard/StandardCard.jsx";

const Trending = ({trending}) => {
    return (
        <>
            <div className="trending">
                <h2 className='h2Trending'>Trending</h2>
                <div className='trendCards'>
                    {trending.map((item) => (
                        <TrendCard key={item.id} item={item}/>
                    ))}

            </div>


            </div>
        </>
    );
};
export default Trending;