import React from "react";
import styles from "./Logo.module.css";
import LogoImg from "./../../../images/burger.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      {" "}
      <div className={styles.Logo}>
        <Link to="/">BURGER BUILDER</Link>
      </div>
      <img src={LogoImg} className={styles.LogoImage} alt="logo" />
    </>
  );
};

export default Logo;
