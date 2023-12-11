import React from 'react'
import { img_300, unavailable } from '../config/config'
   import "./Movie.css"
function MovieCard({title,media_type,original_title,id,date,poster,vote_average
}) {
  return (
    <div className='media'>
         <img className='poster' src={poster ? `${img_300}/${poster}`: `${unavailable}`} alt="" />
           <b className='title'>{title}</b>
             <span className='subtitle'>{media_type ==="tv"?"TV":"Movie"}
               <span className='subtitle'>{date}</span>
             </span>
    </div>
  )
}

export default MovieCard

