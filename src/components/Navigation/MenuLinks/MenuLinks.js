import React from "react";
import styles from "./MenuLinks.module.css";
import { NavLink } from "react-router-dom";
const MenuLinks = () => {
  return (
    <nav className={styles.Menu}>
      <ul className={styles.List}>
        <li>
          <NavLink activeClassName={styles.Active} exact to="/">
            Locations
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.Active} to="/orders">
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.Active} to="/menu">
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.Active} to="/login">
            Sign In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MenuLinks;
