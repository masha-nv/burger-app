import React from "react";
import styles from "./HamburgerIcon.module.css";
import Avatar from "./../../../Avatar/Avatar";

const HamburgerIcon = ({ handleShowSideBar }) => {
  return (
    <div className={styles.HamburgerIcon}>
      <Avatar>
        <div className={styles.Wrapper} onClick={handleShowSideBar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Avatar>
    </div>
  );
};

export default HamburgerIcon;
