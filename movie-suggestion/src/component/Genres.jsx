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

    const handlAdd = (genre) => {
        setSelectGenres([...selectGenres, genre])
        setGenres(genres.filter((el) => el.id !== genre.id))
        setPage(1)
    }
    const handleRemove = (genre) => {
        setSelectGenres(
            selectGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };
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
            {selectGenres && selectGenres.map((el) => {
                return <Chip key={el.id} label={el.name}
                    size='small'
                    color='primary'
                    clickable
                    onDelete={() => handleRemove(el)}
                    style={{ margin: 2 }} />
            })}

            {genres && genres.map((el) => {
                return <Chip key={el.id} label={el.name}
                    size='small'
                    clickable
                    onClick={() => handlAdd(el)}
                    style={{ margin: 2 }} />
            })}


        </div>
    )
}
