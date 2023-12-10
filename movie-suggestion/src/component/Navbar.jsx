import React from 'react';
import styles from "./styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";

export const Navbar = () => {
  return (
    <div className={`${styles.navhead}`}>
      <h2 className={`${styles.title}`}>MovieFlix</h2>
      <div className={`${styles.inputbox}`}>
        <input type="text" name="search" placeholder='Search Movie' />
        <button className={`${styles.button}`}><FaSearch /></button>
      </div>

      <div className={`${styles.link}`}>
        <Link to="/login"><BsPerson /></Link>
        <Link to="/favrouite"><CiHeart /></Link>
      </div>
    </div>
  );
};
