import React, { Component } from "react";
import Burger from "../../components/Layout/Burger/Burger";
import BuildControls from "./../../components/Layout/BuildControls/BuildControls";
import styles from "./BurgerBuilder.module.css";
import Backdrop from "./../../components/Layout/Backdrop/Backdrop";
import axios from "./../../axios/axios";
import withErrorHandler from "./../../withErrorHandler";
import { Spinner } from "../../Spinner/Spinner";
import { connect } from "react-redux";
import { calcPrice } from "../../utils/calcPrice";
import {
  add_ingredient,
  remove_ingredient,
  asyncSetIngredientsState,
  sortEnd,
} from "../../store/actions/burgerBuilderActionCreators";

import {
  asyncHandleCheckout,
  placeOrder,
  cancelCheckout,
} from "../../store/actions/orderActionCreators";

class BurgerBuilder extends Component {
  componentDidMount() {
    const ingredients = [];
    axios.get("/ingredients.json").then((response) => {
      for (let key in response.data) {
        for (let ingr in response.data[key]) {
          ingredients.push(response.data[key][ingr]);
        }
      }
      this.props.onSetIngredientsState(ingredients);
    });
  }

  price = calcPrice(this.props.ingrs);

  render() {
    return this.props.ingrs.length ? (
      <div className={styles.Content}>
        {(this.props.isCheckingout || this.props.isOrderProcessing) && (
          <Backdrop handleHideBackdrop={this.props.onCancelCheckout} />
        )}
        <Burger
          ingredients={this.props.ingrs}
          onSortEnd={({ oldIndex, newIndex }) =>
            this.props.onSortEnd({ oldIndex, newIndex })
          }
        />
        <BuildControls
          isOrderProcessing={this.props.isOrderProcessing}
          handleCheckout={() =>
            this.props.onHandleCheckout(this.props.ingrs, this.props.history)
          }
          handleCancelCheckout={this.props.onCancelCheckout}
          handlePlaceOrder={this.props.onPlaceOrder}
          isCheckingout={this.props.isCheckingout}
          price={this.price}
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
  console.log("MAP STATE TO PROPS", state);
  return {
    ingrs: state.burgerR.ingredients,
    isCheckingout: state.orderR.isCheckingout,
    isOrderProcessing: state.orderR.isOrderProcessing,
    order: state.orderR.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingrType) => dispatch(add_ingredient(ingrType)),
    removeIngredient: (ingrType) => dispatch(remove_ingredient(ingrType)),
    onSetIngredientsState: (ingredients) =>
      dispatch(asyncSetIngredientsState(ingredients)),
    onHandleCheckout: (ingredients, history) =>
      dispatch(asyncHandleCheckout(ingredients, history)),
    onPlaceOrder: () => dispatch(placeOrder()),
    onCancelCheckout: () => dispatch(cancelCheckout()),
    onSortEnd: ({ oldIndex, newIndex }) =>
      dispatch(sortEnd({ oldIndex, newIndex })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
