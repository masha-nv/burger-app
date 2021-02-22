import React from "react";
import styles from "./SideDrawer.module.css";

const SideDrawer = ({ handleCloseSideBar }) => {
  return (
    <div className={styles.SideDrawer}>
      <div className={styles.Header}>
        <div className={styles.CloseButton} onClick={handleCloseSideBar}>
          <div></div>
          <div></div>
        </div>
        <div className={styles.Logo}>BURGER BUILDER</div>
      </div>
      <hr />
      <ul className={styles.List}>
        <li>
          <a href="#">Locations</a>
        </li>
        <li>
          <a href="#">Orders</a>
        </li>
        <li>
          <a href="#">Menu</a>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
