import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../Pagination/CustomPagination';
import MovieCard from '../../MovieCard/MovieCard';
import Genres from '../../Genres';

export const Flims = () => {
  const [page,setPage] = useState(1)
     const [totalPages,setTotalPages] = useState()
  const [data, setData] = useState([]);
    const [selectGenres,setSelectGenres] = useState([]) 
    const [genres,setGenres] = useState([]) 
  const fetchData = () => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
      .then((res) => {
      
         setTotalPages(res.data.total_pages)
        setData(res.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [page])
  return (
    <div>
  <span className='pageTitle'> discover movies</span>
    <Genres type='movie'
        selectGenres={selectGenres}
          setSelectGenres={setSelectGenres}
          setGenres={setGenres}
           genres={genres}
             setPage={setPage}
    />
  <div className='trending'>
       {
       data && data.map((el) => {
         return <MovieCard key={el.id} title={el.title || el.name}
          date={el.first_air_date || el.release_date} id={el.id} poster={el.poster_path}
           media_type={el.media_type} vote_average
         ={el.vote_average
         } />
       })
     }
   </div>
    {totalPages >1 &&  <CustomPagination setPage={setPage} totalPages={totalPages}/>}
    
       </div>
  )
}
