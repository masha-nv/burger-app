import React from "react";
import styles from "./Backdrop.module.css";

const Backdrop = ({ handleHideBackdrop, children }) => {
  return (
    <div onClick={handleHideBackdrop} className={styles.Backdrop}>
      {children}
    </div>
  );
};

export default Backdrop;
