import React from 'react';
import './SearchBar.css';
import iconSearch from '../../assets/imgs/icon-search.svg'
import header from '../header/Header.jsx'
import Header from "../header/Header.jsx";



const SearchBar = () => {
    return(
        <>

        <Header />
        <div className='searchBar'>
            <img className='iconSearch' src={iconSearch} alt='search icon'/>
            <input className='inputSearch' type='text' placeholder='Search for movies or TV series' />

        </div>
        </>
    );
}
export default SearchBar;