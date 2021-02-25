import React, { Component } from "react";
import Burger from "../../components/Layout/Burger/Burger";
import BuildControls from "./../../components/Layout/BuildControls/BuildControls";
import styles from "./BurgerBuilder.module.css";
import Backdrop from "./../../components/Layout/Backdrop/Backdrop";
import axios from "./../../axios/axios";
import withErrorHandler from "./../../withErrorHandler";
import { Spinner } from "../../Spinner/Spinner";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
class BurgerBuilder extends Component {
  state = {
    // ingredients: [],
    isCheckingout: false,
    isOrderProcessing: false,
    order: null,
  };

  componentDidMount() {
    const ingredients = [];
    // axios.get("/ingredients.json").then((response) => {
    //   for (let key in response.data) {
    //     for (let ingr in response.data[key]) {
    //       ingredients.push(response.data[key][ingr]);
    //     }
    //   }
    //   this.setState({ ingredients });
    // }
    // );
  }

  handleCheckout = () => {
    const order = {
      ingredients: this.props.ingrs,
      totalPrice: this.props.ingrs.reduce((acc, val) => {
        return (acc += val["price"] * val["qty"]);
      }, 0),
      id: Math.random(),
    };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => this.setState({ orderName: response.data.name }))
    //   .catch((e) => console.log(e));
    this.setState({ isCheckingout: false, isOrderProcessing: true, order });
    this.showSpinnerEndCheckOut();
  };

  showSpinnerEndCheckOut = () => {
    setTimeout(() => {
      this.setState({ isOrderProcessing: false });
      this.props.history.push({
        pathname: "/checkout",
        state: this.state.order,
      });
    }, 3000);
  };

  handleCancelCheckout = () => {
    this.setState({ isCheckingout: false });
  };

  handlePlaceOrder = () => {
    this.setState({ isCheckingout: true });
  };
  // handleAddIngredient = (type) => {
  //   const ingredients = this.state.ingredients.map((ingredient) =>
  //     ingredient.type === type
  //       ? { ...ingredient, qty: ingredient.qty + 1 }
  //       : ingredient
  //   );

  //   this.setState({ ingredients });
  // };

  // handleRemoveIngredient = (type) => {
  //   const ingredients = this.state.ingredients.map((ingredient) =>
  //     ingredient.type === type && ingredient.qty > 0
  //       ? { ...ingredient, qty: ingredient.qty - 1 }
  //       : ingredient
  //   );

  //   this.setState({ ingredients });
  // };
  render() {
    return this.props.ingrs.length ? (
      <div className={styles.Content}>
        {(this.state.isCheckingout || this.state.isOrderProcessing) && (
          <Backdrop handleHideBackdrop={this.handleCancelCheckout} />
        )}
        <Burger ingredients={this.props.ingrs} />
        <BuildControls
          isOrderProcessing={this.state.isOrderProcessing}
          handleCheckout={this.handleCheckout}
          handleCancelCheckout={this.handleCancelCheckout}
          handlePlaceOrder={this.handlePlaceOrder}
          isCheckingout={this.state.isCheckingout}
          price={this.state.price}
          ingredients={this.props.ingrs}
          handleAddIngredient={this.props.addIngredient}
          handleRemoveIngredient={this.props.removeIngredient}
        />
      </div>
    ) : (
      <Backdrop>
        <div className={styles.Spinner}>
          <Spinner />
        </div>
      </Backdrop>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingrs: state.ingredients,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingrType) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingrType }),
    removeIngredient: (ingrType) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingrType }),
  };
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
