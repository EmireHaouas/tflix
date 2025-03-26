import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'

function App() {

    {/*https://api.themoviedb.org/3/trending/movie/day?api_key=7898561c441dbd5aa0c4b3a3677ff473*/}
   const [bookMarked, setBookMarked] = useState([])

    const handleBookMark = (item) =>{
        setBookMarked(item)

    }

  return (
    <>
       <Home />

    </>
  )
}

export default App
