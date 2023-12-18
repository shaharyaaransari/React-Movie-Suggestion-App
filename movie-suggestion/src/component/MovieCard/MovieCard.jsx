import React from 'react'
import { img_300, unavailable } from '../config/config'
import "./Movie.css"
import ContentModal from '../ContentModal/ContentModal'
import { Badge } from '@material-ui/core'
function MovieCard({ title, media_type, id, date, poster, vote_average
}) {

  return (
    <ContentModal  media_type={media_type} id={id}>
       <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img className='poster' src={poster ? `${img_300}/${poster}` : `${unavailable}`} alt="title" />
      <b className='title'>{title}</b>
      <span className='subtitle'>{media_type === "tv" ? "TV Series" : "Movie"}
        <span className='subtitle'>{date}</span>
      </span>
    </ContentModal>
  )
}

export default MovieCard

