import React, { memo } from "react";
import styles from "./Modal.module.css";

const Modal = ({ children }) => {
  return <div className={styles.Modal}>{children}</div>;
};

export default memo(Modal);
