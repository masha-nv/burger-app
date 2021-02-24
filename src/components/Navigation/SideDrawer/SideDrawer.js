import React from "react";
import styles from "./SideDrawer.module.css";
import { Link } from "react-router-dom";
import Avatar from "./../../../Avatar/Avatar";

const SideDrawer = ({ handleCloseSideBar }) => {
  return (
    <div className={styles.SideDrawer}>
      <div className={styles.Header}>
        <Avatar>
          <div className={styles.CloseButton} onClick={handleCloseSideBar}>
            <div></div>
            <div></div>
          </div>
        </Avatar>
        <div className={styles.Logo}>
          <Link to="/">BURGER BUILDER</Link>
        </div>
      </div>
      <hr />
      <ul className={styles.List}>
        <li>
          <a href="#">Locations</a>
        </li>
        <li>
          <a href="/orders">Orders</a>
        </li>
        <li>
          <a href="#">Menu</a>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
