import React from 'react';
import './Header.css';
import logo from '../../assets/imgs/logo.svg';
import iconHome from '../../assets/imgs/icon-nav-home.svg';
import iconNavMovie from '../../assets/imgs/icon-nav-movies.svg';
import iconNavTv from '../../assets/imgs/icon-nav-tv-series.svg';
import iconNavBookmark from '../../assets/imgs/icon-nav-bookmark.svg';
import avatar from '../../assets/imgs/image-avatar.webp';
import { useLocation, Link } from "react-router-dom";

const Header = () => {
    const location = useLocation(); // Récupère l'URL actuelle

    const activeFilter = 'brightness(0) invert(1)'; // Pour obtenir l'icône blanche

    return(
        <header>
            <img className='logo' src={logo} alt="logo"/>
            <nav className='nav'>
                <Link to='/'>
                    <img
                        className='iconHome'
                        src={iconHome}
                        alt="home Icon"
                        style={{ filter: location.pathname === '/' ? activeFilter : 'none' }}
                    />
                </Link>

                <Link to='/movies'>
                    <img
                        className='iconNavMovie'
                        src={iconNavMovie}
                        alt="movie Icon"
                        style={{ filter: location.pathname === '/movies' ? activeFilter : 'none' }}
                    />
                </Link>

                <Link to='/series'>
                    <img
                        className='iconNavTv'
                        src={iconNavTv}
                        alt="serie Icon"
                        style={{ filter: location.pathname === '/series' ? activeFilter : 'none' }}
                    />
                </Link>

                <Link to='/bookmarked'>
                    <img
                        className='iconNavBookmark'
                        src={iconNavBookmark}
                        alt="bookmark Icon"
                        style={{ filter: location.pathname === '/bookmarked' ? activeFilter : 'none' }}
                    />
                </Link>
            </nav>
            <img className='avatar' src={avatar} alt='avatar'/>
        </header>
    );
};

export default Header;
