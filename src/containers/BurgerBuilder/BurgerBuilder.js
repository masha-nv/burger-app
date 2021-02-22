import React, { Component } from "react";
import Burger from "../../components/Layout/Burger/Burger";
import BuildControls from "./../../components/Layout/BuildControls/BuildControls";
import styles from "./BurgerBuilder.module.css";
import Backdrop from "./../../components/Layout/Backdrop/Backdrop";
import axios from "./../../axios/axios";
import { Spinner } from "./../../Spinner/Spinner";
class BurgerBuilder extends Component {
  state = {
    ingredients: [
      { ingredient: "Cheese", type: "cheese", qty: 0, price: 3.23 },
      { ingredient: "Bacon", type: "bacon", qty: 0, price: 7.29 },
      { ingredient: "Salad", type: "salad", qty: 0, price: 6.13 },
      { ingredient: "Meat", type: "meat", qty: 0, price: 1.28 },
    ],
    isCheckingout: false,
    isOrderProcessing: false,
  };

  handleCheckout = () => {
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.ingredients.reduce((acc, val) => {
        return (acc += val["price"] * val["qty"]);
      }, 0),
      customer: {
        name: "Maria Bagirova",
        email: "text@test.com",
        address: {
          street: "112 Northtowne",
          city: "NY City",
          zipCode: "10200",
        },
      },
    };
    axios
      .post("/orders.json", order)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
    this.setState({ isCheckingout: false, isOrderProcessing: true });
    this.showSpinnerEndCheckOut();
  };

  showSpinnerEndCheckOut = () => {
    setTimeout(() => {
      this.setState({ isOrderProcessing: false });
    }, 3000);
  };

  handleCancelCheckout = () => {
    this.setState({ isCheckingout: false });
  };

  handlePlaceOrder = () => {
    this.setState({ isCheckingout: true });
  };
  handleAddIngredient = (type) => {
    const ingredients = this.state.ingredients.map((ingredient) =>
      ingredient.type === type
        ? { ...ingredient, qty: ingredient.qty + 1 }
        : ingredient
    );

    this.setState({ ingredients });
  };

  handleRemoveIngredient = (type) => {
    const ingredients = this.state.ingredients.map((ingredient) =>
      ingredient.type === type && ingredient.qty > 0
        ? { ...ingredient, qty: ingredient.qty - 1 }
        : ingredient
    );

    this.setState({ ingredients });
  };
  render() {
    return (
      <div className={styles.Content}>
        {(this.state.isCheckingout || this.state.isOrderProcessing) && (
          <Backdrop handleHideBackdrop={this.handleCancelCheckout} />
        )}
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          isOrderProcessing={this.state.isOrderProcessing}
          handleCheckout={this.handleCheckout}
          handleCancelCheckout={this.handleCancelCheckout}
          handlePlaceOrder={this.handlePlaceOrder}
          isCheckingout={this.state.isCheckingout}
          price={this.state.price}
          ingredients={this.state.ingredients}
          handleAddIngredient={this.handleAddIngredient}
          handleRemoveIngredient={this.handleRemoveIngredient}
        />
      </div>
    );
  }
}

export default BurgerBuilder;
