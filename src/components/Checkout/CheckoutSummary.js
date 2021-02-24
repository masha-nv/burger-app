import React, { Component } from "react";
import Burger from "./../Layout/Burger/Burger";
import styles from "./CheckoutSummary.module.css";
import axios from "../../axios/axios";
import { Spinner } from "../../Spinner/Spinner";
import { Route } from "react-router-dom";
import LoginForm from "./../../containers/LoginForm/LoginForm";

class CheckoutSummary extends Component {
  state = { order: null };
  componentDidMount() {
    // const query = new URLSearchParams(this.props.location.search);
    // console.log("QUERY", query.entries());
    // const ingredient = {};
    // const order = {};
    // for (let param of query.entries()) {
    //   console.log("PARAM", param);
    //   ingredient[param[0]] = param[1];
    //   console.log(ingredient);
    //   console.log("ORDER", order);
    // }
    const orders = [];
    axios.get("/orders.json").then((response) => {
      for (let key in response.data) {
        orders.push({ ...response.data[key], id: key });
      }
      const order = orders.find(
        (order) => order.id === this.props.location.state.message
      );
      this.setState({ order });
    });
  }
  render() {
    const { order } = this.state;
    return this.state.order ? (
      <div className={styles.CheckoutSummary}>
        <h1>
          Your Order
          <span
            onClick={() => this.props.history.goBack()}
            className={styles.CancelOrder}
          >
            X
          </span>
        </h1>

        <div className={styles.Burger}>
          <Burger ingredients={order.ingredients} />
        </div>
        <div className={styles.OrderDetails}>
          <div className={styles.Ingredients}>
            {order.ingredients.map((ingr) => (
              <li>{ingr.ingredient}</li>
            ))}
          </div>
          <div className={styles.Prices}>
            {order.ingredients.map((ingr) => (
              <li>${ingr.price * ingr.qty}</li>
            ))}
          </div>
        </div>
        <button
          className={styles.CheckoutBtn}
          onClick={() => {
            this.props.history.push({ pathname: "/login", state: order });
          }}
        >
          Checkout <span>${parseFloat(order.totalPrice).toFixed(2)}</span>
        </button>
      </div>
    ) : (
      <Spinner />
    );
  }
}

export default CheckoutSummary;
