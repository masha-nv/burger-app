import React, { Component } from "react";
import axios from "../../axios/axios";
import Order from "./../../components/Order/Order";
import styles from "./Orders.module.css";

class Orders extends Component {
  state = { myOrders: [] };

  componentDidMount() {
    const orders = [];
    axios
      .get("/myOrders.json")
      .then((response) => {
        console.log("RESPONSE", response);
        const result = Object.entries(response.data);
        console.log("RESULT", result);
        for (let i = 0; i < result.length; i++) {
          orders.push(result[i][1]);
        }
        console.log("ORDERS", orders);
        this.setState({ myOrders: orders });
      })
      .catch((e) => console.log(e));
  }

  render() {
    const { myOrders } = this.state;
    return (
      <div className={styles.Orders}>
        <h1>You Orders</h1>
        {myOrders.length ? (
          <ul className={styles.List}>
            {myOrders.map((order) => (
              <Order order={order} key={order.id} />
            ))}
          </ul>
        ) : (
          <p>No orders to diplay</p>
        )}
      </div>
    );
  }
}

export default Orders;
