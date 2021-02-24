import React from "react";
import styles from "./Order.module.css";

const Order = ({ order }) => {
  return (
    <summary className={styles.Order}>
      <div className={styles.OrderInfo}>
        <h4>Ingredients</h4>
        <ul>
          {order.ingredients.map((ingr) => (
            <li>
              {ingr.ingredient} - {ingr.qty}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.OrderInfo}>
        <h4>Total</h4>
        <p>${parseFloat(order.totalPrice).toFixed(2)}</p>
      </div>
      <div className={styles.OrderInfo}>
        <h4>Customer Name:</h4>
        <p>
          {order.firstName} {order.lastName}
        </p>
      </div>
    </summary>
  );
};

export default Order;
