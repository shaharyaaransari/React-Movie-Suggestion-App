import { Chip } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'

export default function Genres({
    selectGenres,
    setSelectGenres,
    setGenres,
    genres,
    setPage, type
}) {
    const fetchGenres = () => {
        axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en`)
            .then((res) => {
                setGenres(res.data.genres)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchGenres()
        return () => {
            setGenres({})
        }
    }, [])


    return (
        <div style={{ padding: "6px 0" }}>
            {genres && genres.map((el) => {
                return <Chip key={el.id} label={el.name}
                    size='small'
                    clickable
                    style={{ margin: 2 }} />
            })}


        </div>
    )
}
