import {useEffect,useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './Content.css'
import YouTubeIcon from "@material-ui/icons/YouTube";
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { img_300, unavailable } from '../config/config';
import { Button } from '@mui/material';

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

export default function ContentModal({children, media_type,id}) {
  const [open, setOpen] = useState(false);
  const [data,setData] = useState()
  const [video,setVideo] = useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  const fetchData = () => {
    axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      .then((res) => {
       // console.log(res.data)
        setData(res.data);
       // Corrected variable name
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchVideo = () => {
    axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      .then((res) => {
        console.log(res.data)
        setVideo(res.data.results[0]?.key);
       // Corrected variable name
      })
      .catch((err) => {
        console.log(err);
      });
  }
useEffect(()=>{
    fetchData()
    fetchVideo()
    // eslint-disable-next-line 
},[])

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
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        {data && (
          <Box className={classes.paper}>
            <div className="ContentModal">
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
                <span className="ContentModal__title">
                  {data.name || data.title}(
                  {(
                    data.first_air_date || data.release_date || "-----"
                  ).substring(0, 4)}
                  )
                </span>
                {data.tagline && <i className="tagline"> {data.tagline}</i>}
                <span className="ContentModal__description">
                  {data.overview}
                </span>
                <div></div>
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