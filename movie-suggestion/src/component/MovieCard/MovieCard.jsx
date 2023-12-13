import React from 'react'
import { img_300, unavailable } from '../config/config'
   import "./Movie.css"
function MovieCard({title,media_type,id,date,poster,vote_average
}) {
  return (
    <div className='media'>
        <div className="custom-badge">
  
  <span className="badge-content" style={{backgroundColor:vote_average>6?"rgb(216, 27, 96)":"#3F51B5"}}>{vote_average}</span>
</div>
         <img className='poster' src={poster ? `${img_300}/${poster}`: `${unavailable}`} alt="" />
           <b className='title'>{title}</b>
             <span className='subtitle'>{media_type ==="tv"?"TV":"Movie"}
               <span className='subtitle'>{date}</span>
             </span>
    </div>
  )
}

export default MovieCard

