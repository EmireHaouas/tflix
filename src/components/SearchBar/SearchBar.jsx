import React from 'react';
import './SearchBar.css';
import iconSearch from '../../assets/imgs/icon-search.svg'




const SearchBar = ({onClick, value, onChange}) => {
    return(
        <>

        <div className='searchBar'>
            <img className='iconSearch' onClick={onClick} src={iconSearch} alt='search icon'/>
            <input  onChange={onChange} className='inputSearch' type='text' placeholder='Search for movies or TV series' />

        </div>
        </>
    );
}
export default SearchBar;