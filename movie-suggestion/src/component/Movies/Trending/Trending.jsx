import React, { useEffect, useState } from 'react'
import axios from "axios"
import MovieCard from '../../MovieCard/MovieCard';
  import "./Trending.css"
export const Trending = () => {
  const [data, setData] = useState([]);
  const fetchData = () => {
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`)
      .then((res) => {
       console.log(res.data.results)
        setData(res.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
        <div>
             <span className='pageTitle'>trending</span>
      <div className='trending'>
     
      {
        data && data.map((el) => {
          return <MovieCard key={el.id} title={el.title || el.name} date={el.first_air_date || el.release_date} id={el.id} poster={el.poster_path} media_type={el.media_type} vote_average
          ={el.vote_average
          } />
        })
      }


    </div>
        </div>
  
  )
}
