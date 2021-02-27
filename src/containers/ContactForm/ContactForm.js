import React, { Component } from "react";
import Avatar from "../../Avatar/Avatar";
import styles from "./ContactForm.module.css";
import axios from "../../axios/axios";
import OrderConfirmation from "../../OrderConfirmationWindow/OrderConfirmation";
import Backdrop from "../../components/Layout/Backdrop/Backdrop";
import Input from "../../components/Input/Input";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Orders from "../Orders/Orders";

class ContactForm extends Component {
  state = {
    firstName: { value: "", errorMessage: "" },
    lastName: { value: "", errorMessage: "" },
    street: { value: "", errorMessage: "" },
    city: { value: "", errorMessage: "" },
    zipCode: { value: "", errorMessage: "" },
    orderReceived: false,
    isValid: false,
  };

  isFormValid = () => {
    const errorMsgs = [];
    for (let key in this.state) {
      errorMsgs.push(this.state[key]);
    }
    const result = errorMsgs.reduce((acc, val) => {
      for (let key in val) {
        key === "errorMessage" && acc.push(val[key]);
      }
      // console.log(acc);
      return acc;
    }, []);
    const msgType = [];
    result.forEach((res) => {
      msgType.push(res.type);
    });
    // console.log("RESULT", msgType);
    return msgType.every((msg) => msg === "success");
  };

  static defaultProps = {
    formData: {
      firstName: {
        htmlFor: "firstName",
        inputtype: "input",
        label: "First Name",
        name: "firstName",
        type: "text",
        id: "firstName",
      },
      lastName: {
        label: "Last Name",
        inputtype: "input",
        htmlFor: "lastName",
        name: "lastName",
        type: "text",
        id: "lastName",
      },
      city: {
        inputtype: "input",
        htmlFor: "city",
        label: "City",
        name: "city",
        type: "text",
        id: "city",
      },
      street: {
        inputtype: "input",
        htmlFor: "street",
        label: "Street",
        name: "street",
        type: "text",
        id: "street",
      },
      zipCode: {
        inputtype: "input",
        htmlFor: "zipCode",
        label: "Zip Code",
        name: "zipCode",
        type: "text",
        id: "zipCode",
      },
    },
  };

  handleChange = (name, e) => {
    this.setState({
      [name]: {
        value: e.target.value,
        errorMessage: this.handleErrorMessage(e),
      },
      isValid: this.isFormValid(),
    });
  };

  handleErrorMessage = (e) => {
    let errorMessage =
      e.target.value.trim().length === 0
        ? { msg: "This field is required", type: "error" }
        : { msg: "Looks Good!", type: "success" };
    return errorMessage;
  };

  handlePlaceOrder = (e) => {
    e.preventDefault();
    const totalPrice = this.props.ingrs.reduce((acc, val) => {
      return (acc += val["price"] * val["qty"]);
    }, 0);
    const order = { ...this.state, totalPrice, ingredients: this.props.ingrs };
    console.log("CONTACT FORM", "/myOrders.json?auth=" + this.props.token);
    axios
      .post("/myOrders.json?auth=" + this.props.token, order)
      .then(() => {
        this.setState({
          firstName: { value: "", errorMessage: "" },
          lastName: { value: "", errorMessage: "" },
          street: { value: "", errorMessage: "" },
          city: { value: "", errorMessage: "" },
          zipCode: { value: "", errorMessage: "" },
          orderReceived: true,
          isValid: false,
        });
      })
      .catch((e) => {
        this.props.history.push("/auth");
      });
  };

  render() {
    const res = this.isFormValid();
    // console.log(res);
    console.log("CONTACT FORM", "/myOrders.json?auth=" + this.props.token);

    const { isValid } = this.state;
    const inputs = [];
    for (let key in this.props.formData) {
      inputs.push({ ...this.props.formData[key], id: key });
    }
    // console.log("INPUTS", inputs);
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
            <div className={styles.InputsContainer}>
              {inputs.map((inputEl) => (
                <Input
                  handleChange={this.handleChange}
                  value={this.state[inputEl.name].value}
                  inputInfo={inputEl}
                  errorMessage={this.state[inputEl.name].errorMessage}
                />
              ))}
            </div>
            <button
              className={isValid ? styles.SubmitBtn : styles.Invalid}
              disabled={!isValid}
            >
              Place Order
            </button>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingrs: state.burgerR.ingredients,
    token: state.authR.idToken,
  };
};

export default connect(mapStateToProps)(ContactForm);
