import React from "react";
import styles from "./HamburgerIcon.module.css";

const HamburgerIcon = ({ handleShowSideBar }) => {
  return (
    <div className={styles.Wrapper} onClick={handleShowSideBar}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default HamburgerIcon;
