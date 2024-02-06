import React, { useContext } from 'react'
import { AuthContext } from '../component/contextApi/AuthContext'
import MovieCard from '../component/MovieCard/MovieCard'
 import "./favrouite.css"
function Favrouite() {
  const {fav} = useContext(AuthContext)
   
  return (
      <>
           <span className='pageTitle'>favrouite</span>
       <div className='favrouite'>
      
      {
        fav && fav.map((el) => {
          return <MovieCard key={el.id} title={el.title || el.name} date={el.first_air_date || el.release_date} id={el.id} poster={el.poster_path} media_type={el.media_type} vote_average
          ={el.vote_average
          } />
        })
      }
    </div>
      </>
   
  )
}

export default Favrouite