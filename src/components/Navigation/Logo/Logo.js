import React from "react";
import styles from "./Logo.module.css";
import LogoImg from "./../../../images/burger.png";

const Logo = () => {
  return (
    <>
      {" "}
      <div className={styles.Logo}>BURGER BUILDER</div>
      <img src={LogoImg} className={styles.LogoImage} alt="logo" />
    </>
  );
};

export default Logo;
