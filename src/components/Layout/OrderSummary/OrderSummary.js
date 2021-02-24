import { Link } from "react-router-dom";
import React, { Component } from "react";
import Modal from "./../Modal/Modal";
import styles from "./OrderSummary.module.css";
import { withRouter } from "react-router-dom";

class OrderSummary extends Component {
  render() {
    const {
      ingredients,
      price,
      handleCheckout,
      handleCancelCheckout,
    } = this.props;
    let ingrs = ingredients.map((ingr) =>
      ingr.qty > 0 ? { ingr: ingr.ingredient, qty: ingr.qty } : ingr
    );
    ingrs = ingrs.filter((ingr) => ingr.qty > 0);

    const params = ingredients.reduce((acc, val) => {
      for (let key in val) {
        acc.push(encodeURIComponent(key) + "=" + encodeURIComponent(val[key]));
      }
      return acc;
    }, []);

    const queryString = params.join("&");

    return (
      <Modal handleCancelCheckout={handleCancelCheckout}>
        <div className={styles.Summary}>
          <h3> Order Summary</h3>
          <div>
            Burger with:
            <ul>
              {ingrs.map((ingr, i) => (
                <li key={ingr + i}>
                  {ingr.ingr} (qty: {ingr.qty}) {"  "}
                </li>
              ))}
            </ul>
          </div>
          <p>
            TOTAL:<b> ${parseFloat(price).toFixed(2)}</b>
          </p>
          <div className={styles.Buttons}>
            {/* <button
              onClick={() => {
                this.props.history.push({
                  pathname: "/checkout",
                  search: "?" + queryString,
                });
              }}
            >
              Continue
            </button> */}
            <button onClick={handleCheckout}>Continue</button>
            <button onClick={handleCancelCheckout}>Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withRouter(OrderSummary);
