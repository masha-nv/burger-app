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
          onClick={() => props.history.push("/")}
          className={styles.goBack}
        >
          Go Back
        </button>
      </Modal>
    </div>
  );
};

export default withRouter(OrderConfirmation);
