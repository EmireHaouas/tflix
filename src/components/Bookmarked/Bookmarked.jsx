import React, { useState, useEffect } from 'react';
import './Bookmarked.css';
import Header from "../header/Header.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import StandardCard from "../StandardCard/StandardCard.jsx";

const Bookmarked = ({ bookmarked, handleBookMarked }) => {
    const [searchBookmarked, setSearchBookmarked] = useState('');
    const [filteredBookmarked, setFilteredBookmarked] = useState([]);

    useEffect(() => {
        const timeoutIdBookmarked = setTimeout(() => {
            if (searchBookmarked === '') {
                setFilteredBookmarked([]);
            } else {
                const searchInBookmarked = bookmarked.filter(b =>
                    b.title && b.title.toLowerCase().includes(searchBookmarked.toLowerCase())
                );
                setFilteredBookmarked(searchInBookmarked);
            }
        }, 100);

        return () => clearTimeout(timeoutIdBookmarked);
    }, [searchBookmarked, bookmarked]);

    return (
        <>
            <Header />
            <SearchBar
                value={searchBookmarked}
                onChange={(e) => setSearchBookmarked(e.target.value)}
                placeholder="Search for bookmarked shows"
            />

            <div className="bookmarkedContainer">

                {searchBookmarked !== '' && filteredBookmarked.length > 0 ? (
                    <div className="recommended">
                        {filteredBookmarked.map((item) => (
                            <StandardCard
                                key={item.id}
                                item={item}
                                bookmarked={bookmarked}
                                handleBookMarked={handleBookMarked}
                                className="standard-card"
                            />
                        ))}
                    </div>
                ) : (

                    searchBookmarked !== '' && <p>No items found for this search.</p>
                )}


                {searchBookmarked === '' && bookmarked.length > 0 && (
                    <div className="recommended">
                        {bookmarked.map((item) => (
                            <StandardCard
                                key={item.id}
                                item={item}
                                bookmarked={bookmarked}
                                handleBookMarked={handleBookMarked}
                                className="standard-card"
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Bookmarked;
