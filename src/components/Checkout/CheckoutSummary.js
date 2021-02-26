import React, { Component } from "react";
import Burger from "./../Layout/Burger/Burger";
import styles from "./CheckoutSummary.module.css";
import { connect } from "react-redux";

class CheckoutSummary extends Component {
  render() {
    const totalPrice = this.props.ingrs.reduce((acc, val) => {
      return (acc += val["price"] * val["qty"]);
    }, 0);
    console.log(totalPrice);

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
            {this.props.ingrs.map((ingr, i) => (
              <li key={ingr + i}>{ingr.ingredient}</li>
            ))}
          </div>
          <div className={styles.Prices}>
            {this.props.ingrs.map((ingr, i) => (
              <li key={ingr + i}>${ingr.price * ingr.qty}</li>
            ))}
          </div>
        </div>
        <button
          className={styles.CheckoutBtn}
          onClick={() => {
            this.props.history.push("/login");
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
    ingrs: state.burgerR.ingredients,
  };
};

export default connect(mapStateToProps)(CheckoutSummary);
