import React from "react";
import styles from "./Avatar.module.css";

const Avatar = (props) => {
  return <div className={styles.Avatar}>{props.children}</div>;
};

export default Avatar;
