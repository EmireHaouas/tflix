import React from 'react';
import './Bookmarked.css';
import Header from "../header/Header.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";

const Bookmarked = ({bookmarked, handleBookMarked}) => {
    return (
        <>
            <Header />
            <div className='bookmarkedContainer'>
            <SearchBar/>
        <div className="bookmarked">

                {bookmarked.length > 0 ? (
                    <div className='recommended'>
                        {bookmarked.map((item) => (
                            <StandardCard key={item.id} item={item} bookmarked={bookmarked} handleBookMarked={handleBookMarked} className="standard-card"/>
                        ))}
                    </div>
                ) : (
                    <p>No items bookmarked yet.</p>
                )}

        </div>
            </div>
        </>
    );
};
export default Bookmarked;