import React, { Component } from "react";
import Burger from "./../Layout/Burger/Burger";
import styles from "./CheckoutSummary.module.css";
import { connect } from "react-redux";
import axios from "../../axios/axios";
import { Spinner } from "../../Spinner/Spinner";
import { Route } from "react-router-dom";
import LoginForm from "./../../containers/LoginForm/LoginForm";

class CheckoutSummary extends Component {
  // state = { order: null };
  // componentDidMount() {
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
  // const orders = [];
  //   axios.get("/orders.json").then((response) => {
  //     for (let key in response.data) {
  //       orders.push({ ...response.data[key], id: key });
  //     }
  //     const order = orders.find(
  //       (order) => order.id === this.props.location.state.order
  //     );
  //     this.setState({ order });
  //   });
  // }
  render() {
    console.log(this.props);

    const totalPrice = this.props.ingrs.reduce((acc, val) => {
      return (acc += val["price"] * val["qty"]);
    }, 0);
    // const order = this.props.location.state;
    // const { order } = this.state;
    return (
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
          <Burger ingredients={this.props.ingrs} />
        </div>
        <div className={styles.OrderDetails}>
          <div className={styles.Ingredients}>
            {this.props.ingrs.map((ingr) => (
              <li>{ingr.ingredient}</li>
            ))}
          </div>
          <div className={styles.Prices}>
            {this.props.ingrs.map((ingr) => (
              <li>${ingr.price * ingr.qty}</li>
            ))}
          </div>
        </div>
        <button
          className={styles.CheckoutBtn}
          onClick={() => {
            this.props.history.push({
              pathname: "/login",
              state: { ingredients: this.props.ingrs, totalPrice },
            });
          }}
        >
          Checkout <span>${parseFloat(totalPrice).toFixed(2)}</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingrs: state.ingredients,
  };
};

export default connect(mapStateToProps)(CheckoutSummary);
