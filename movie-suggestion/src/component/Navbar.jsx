import React, { useContext } from 'react';
import styles from "./styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from './contextApi/AuthContext';

export const Navbar = () => {
  const {isAuth,setAuth} = useContext(AuthContext)
    let  details =localStorage.getItem("userDetails");
      details = JSON.parse(details);
     
  return (
    <div className={`${styles.navhead}`}>
        <Link to="/"> <h2 className={`${styles.title}`}>MovieFlix</h2></Link>
     
      <div className={`${styles.inputbox}`}>
        <input type="text" name="search" placeholder='Search Movie' />
        <button className={`${styles.button}`}><FaSearch /></button>
      </div>
        {isAuth? <h3>{details.username}</h3>:null}
  
      <div className={`${styles.link}`}>
         {!isAuth? <Link to="/login"><BsPerson /></Link>:<button onClick={()=>setAuth(!isAuth)}>Logout</button>}
       
        <Link to="/favrouite"><CiHeart /></Link>
      </div>
    </div>
  );
};
