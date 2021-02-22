import React, { Component } from "react";
import Burger from "../../components/Layout/Burger/Burger";
import BuildControls from "./../../components/Layout/BuildControls/BuildControls";
import styles from "./BurgerBuilder.module.css";
import Backdrop from "./../../components/Layout/Backdrop/Backdrop";

class BurgerBuilder extends Component {
  state = {
    ingredients: [
      { ingredient: "Cheese", type: "cheese", qty: 0, price: 3.23 },
      { ingredient: "Bacon", type: "bacon", qty: 0, price: 7.29 },
      { ingredient: "Salad", type: "salad", qty: 0, price: 6.13 },
      { ingredient: "Meat", type: "meat", qty: 0, price: 1.28 },
    ],
    isCheckingout: false,
  };
  handleCheckout = () => {
    alert("Thank you for your Order");
    this.setState({ isCheckingout: false });
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
        {this.state.isCheckingout && (
          <Backdrop handleHideBackdrop={this.handleCancelCheckout} />
        )}
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
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
