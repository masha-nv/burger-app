import React from "react";
import Modal from "../components/Layout/Modal/Modal";
import styles from "./OrderConfirmation.module.css";
import { withRouter } from "react-router-dom";
const OrderConfirmation = (props) => {
  return (
    <div className={styles.OrderConfirmation}>
      <Modal>
        <h1>Thank you for your order.</h1>
        <button
          onClick={() => props.history.push("/orders")}
          className={styles.goBack}
        >
          All Orders
        </button>
        <button className={styles.goBack}>Home</button>
      </Modal>
    </div>
  );
};

export default withRouter(OrderConfirmation);
