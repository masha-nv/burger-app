import React, { Component } from "react";
import Avatar from "../../Avatar/Avatar";
import styles from "./LoginForm.module.css";
import axios from "../../axios/axios";
import OrderConfirmation from "../../OrderConfirmationWindow/OrderConfirmation";
import Backdrop from "./../../components/Layout/Backdrop/Backdrop";

class LoginForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    city: "",
    street: "",
    zipCode: "",
    orderReceived: false,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePlaceOrder = (e) => {
    e.preventDefault();
    const order = { ...this.state, ...this.props.location.state };
    axios
      .post("/myOrders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({
          firstName: "",
          lastName: "",
          city: "",
          street: "",
          zipCode: "",
          orderReceived: true,
        });
      })
      .catch((e) => console.log(e));
  };
  render() {
    const { firstName, lastName, city, street, zipCode } = this.state;
    return (
      <>
        {this.state.orderReceived && (
          <div className={styles.orderReceived}>
            <Backdrop>
              <OrderConfirmation />
            </Backdrop>
          </div>
        )}
        <div className={styles.Checkout}>
          <span
            className={styles.CloseSignIn}
            onClick={() => this.props.history.push("/")}
          >
            <Avatar>
              <span className={styles.x}>x</span>
            </Avatar>
          </span>
          <form onSubmit={this.handlePlaceOrder}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                autoComplete="off"
                type="text"
                id="firstName"
                value={firstName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                autoComplete="off"
                type="text"
                id="lastName"
                value={lastName}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                name="city"
                autoComplete="off"
                type="text"
                id="city"
                value={city}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="street">Street</label>
              <input
                name="street"
                autoComplete="off"
                type="text"
                id="street"
                value={street}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                name="zipCode"
                autoComplete="off"
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={this.handleChange}
              />
            </div>
            <button className={styles.SubmitBtn}>Place Order</button>
          </form>
        </div>
      </>
    );
  }
}

export default LoginForm;
