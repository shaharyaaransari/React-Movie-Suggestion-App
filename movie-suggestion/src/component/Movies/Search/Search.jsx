import React, { useEffect, useState } from 'react';
import { TextField, ThemeProvider, Button, Tabs, Tab } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { createTheme } from '@material-ui/core/styles';
import axios from "axios";
import MovieCard from '../../MovieCard/MovieCard';
import CustomPagination from '../../Pagination/CustomPagination';

function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [searchtext, setSearchText] = useState("");
  const [totalPages, setTotalPages] = useState(); // Corrected variable name
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
    overrides: {
      MuiTabs: {
        indicator: {
          backgroundColor: 'white', // Set the indicator color to white
        },
      },
    },
  });

  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
    // eslint-disable-next-line 
  }, [page, type]);

  const fetchData = () => {
    axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&language=en-US&query=${searchtext}&page=${page}`)
      .then((res) => {
        setData(res.data.results);
        setTotalPages(res.data.total_pages); // Corrected variable name
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ width: "80%", display: "flex", margin: "15px auto" }}>
          <TextField className='sarchBox' value={searchtext} onChange={(e) => setSearchText(e.target.value)} label="search" variant='filled' style={{ flex: 1, fontSize: "25px" }} />
          <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchData}>
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor='primary'
          onChange={(event, value) => {
            setType(value);
            setPage(1);
          }}
          textColor='primary'
          aria-label="disabled tabs example"
          style={{ marginLeft: "150px", color: "white", width: "80%" }}>
          <Tab style={{ width: '50%', color: 'white' }} label="Search Movies" />
          <Tab style={{ width: '50%', color: 'white' }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      <div className='trending'>
        {data && data.map((el) => (
          <MovieCard
            key={el.id}
            title={el.title || el.name}
            date={el.first_air_date || el.release_date}
            id={el.id}
            poster={el.poster_path}
            media_type={type ? "tv" : "movie"}
            vote_average={el.vote_average}
          />
        ))}
        {searchtext &&
          !data &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>

      {totalPages > 1 && <CustomPagination setPage={setPage} totalPages={totalPages} />}
    </div>
  );
}

export default Search;
