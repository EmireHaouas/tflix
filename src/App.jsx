import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import Trending from "./components/Trending/Trending.jsx";

function App() {

    {/*https://api.themoviedb.org/3/trending/movie/day?api_key=7898561c441dbd5aa0c4b3a3677ff473*/}


  return (
    <>
        {/*} <Header />*/}
        <SearchBar />
        <Trending />

    </>
  )
}

export default App
