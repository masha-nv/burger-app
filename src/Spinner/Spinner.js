import React from "react";
import Modal from "../components/Layout/Modal/Modal";
import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <Modal>
      <div className={styles.Spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Modal>
  );
};
