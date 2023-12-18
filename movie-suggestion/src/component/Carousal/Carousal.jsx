import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../config/config';
import axios from 'axios';
import "./Carousal.css"
const handleDragStart = (e) => e.preventDefault();



const Carousal = ({ media_type, id }) => {
    const [credits, setCredits] = useState([])
    const fetchCredits = () => {
        axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then((res) => {
            
                setCredits(res.data.cast);

            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        fetchCredits()
    }, [])
    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };
    const items = credits?.map((el) => {
    return    <div className='carouselItem'>
            <img src={el.profile_path
                ? `${img_300}/${el.profile_path}`
                : noPicture} alt={el.name}
                onDragStart={handleDragStart}
                className='carouselItem__img'
            />
            <b className='carousalItem__text'>{el.name}</b>
        </div>
    })
    return (
        <AliceCarousel 
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items} />
    );
}

export default Carousal