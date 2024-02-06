import { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CiHeart } from "react-icons/ci";
import './Content.css'
import YouTubeIcon from "@material-ui/icons/YouTube";
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { img_300, unavailable } from '../config/config';
import { Button } from '@mui/material';
import Carousal from '../Carousal/Carousal';
import ClearIcon from '@material-ui/icons/Clear';
import { AuthContext } from '../contextApi/AuthContext';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));


export default function ContentModal({ children, media_type, id,setIsHeartClicked,isHeartClicked }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
 
  const {fav,setFav} = useContext(AuthContext)
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  const fetchData = () => {
    axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVideo = () => {
    axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      .then((res) => {
        setVideo(res.data.results[0]?.key);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

 const handlefav = ()=>{
  // Check if the data ID is already present in the fav array
  const isAlreadyFav = fav.some(item => item.id === data.id);

  // If the data is not already in the fav array, add it
  if (!isAlreadyFav) {
    setIsHeartClicked(true); // Update UI state
    setFav(prevFav => [...prevFav, data]); // Add data to fav array
  }

  console.log(data);
 }

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        className={classes.modal}
       
       
     
      >
        <Fade in={open}>
          {data && (
            <Box className={classes.paper}>
              <div className="ContentModal" >
                <img
                  className="ContentModal__portrait"
                  src={
                    data.poster_path
                      ? `${img_300}/${data.poster_path}`
                      : `${unavailable}`
                  }
                  alt="title"
                />
                <img
                  className="ContentModal__landscape"
                  src={
                    data.backdrop_path
                      ? `${img_300}/${data.backdrop_path}`
                      : `${unavailable}`
                  }
                  alt="title"
                />
                <div className="ContentModal__about">
                  <ClearIcon onClick={handleClose} />
                  <span
  className="ContentModal__fav"
  
>
  <CiHeart  className={` ${isHeartClicked ? 'heartClicked' : ''}`}
  onClick={handlefav }/>
</span>

                  <span className="ContentModal__title">
                    {data.name || data.title}(
                    {(
                      data.first_air_date || data.release_date || "------"
                    ).substring(0, 4)}
                    )
                  </span>

                  {data.tagline && <i className="tagline"> {data.tagline}</i>}
                  <span className="ContentModal__description">
                    {data.overview}
                  </span>
                  <div>
                    <Carousal media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
