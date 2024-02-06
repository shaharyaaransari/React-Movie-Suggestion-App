import React, { useContext } from 'react';
import styles from "./styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { AuthContext } from './contextApi/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faFilm, faSearch, faFire } from '@fortawesome/free-solid-svg-icons';
export const Navbar = () => {
  const { isAuth, setAuth } = useContext(AuthContext)
  let details = localStorage.getItem("userDetails");
  details = JSON.parse(details);

  return (
    <div className={`${styles.navhead}`}>
      <Link to="/"> <h2 className={`${styles.title}`} onClick={()=>window.scroll(0,0)}>MovieFlix</h2></Link>
      <div className={`${styles.icon}`}>
        <Link to="/series">
          <div>
            <FontAwesomeIcon icon={faTv} style={{ fontSize: '1.3em' }} />
            <p>TV Series</p>
          </div>
        </Link>
        <Link to="/flim">
          <div>
            <FontAwesomeIcon icon={faFilm} style={{ fontSize: '1.3em' }} />
            <p>Movies</p>
          </div>
        </Link>
        <Link to="/search">
          <div>
            <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.3em' }} />
            <p>Search</p>
          </div>
        </Link>
        <Link to="/">
          <div>
            <FontAwesomeIcon icon={faFire} style={{ fontSize: '1.3em' }} />
            <p>Trending</p>
          </div>
        </Link>
      </div>
      {isAuth ? <h3>{details.username}</h3> : null}
      <div className={`${styles.link}`}>
        {!isAuth ? <Link to="/login"><BsPerson /></Link> : <button style={{cursor:"pointer"}} onClick={() => setAuth(!isAuth)}>Logout</button>}
        <Link to="/favrouite"><CiHeart /></Link>
      </div>
    </div>
  );
};
