import React from 'react';
import './Header.css';
import logo from  '../../assets/imgs/logo.svg';
import iconHome from '../../assets/imgs/icon-nav-home.svg';
import iconNavMovie from '../../assets/imgs/icon-nav-movies.svg';
import iconNavTv from '../../assets/imgs/icon-nav-tv-series.svg';
import iconNavBookmark from '../../assets/imgs/icon-nav-bookmark.svg';
import avatar from '../../assets/imgs/image-avatar.webp';

const Header = () => {
    return(
        <header>
            <img className='logo' src={logo} alt="logo"/>
            <nav className='nav'>

                <img className='iconHome' src={iconHome} alt="home Icon"/>
                <img className='iconNavMovie' src={iconNavMovie} alt="movie Icon"/>
                <img className='iconNavTv' src={iconNavTv} alt="serie Icon"/>
                <img className='iconNavBookmark' src={iconNavBookmark} alt='bookmark icon'/>
            </nav>
            <img className='avatar' src={avatar} alt='avatar'/>

        </header>
    );
};

export default Header;