import React from "react";
import styles from "./MenuLinks.module.css";
import { NavLink } from "react-router-dom";
const MenuLinks = () => {
  return (
    <nav className={styles.Menu}>
      <ul className={styles.List}>
        <li>
          <a href="#">Locations</a>
        </li>
        <li>
          <a href="/orders">Orders</a>
        </li>
        <li>
          <NavLink to="/menu">Menu</NavLink>
        </li>
        <li>
          <NavLink to="/login">Sign In</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MenuLinks;
