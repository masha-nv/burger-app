import * as actionTypes from "./actionTypes";

export const handleCheckout = (ingredients) => {
  return {
    type: actionTypes.HANDLE_CHECKOUT,
    ingredients: ingredients,
  };
};

export const handleIsOrderProcessing = () => {
  return {
    type: actionTypes.ORDER_PROCESSING,
  };
};

export const asyncHandleCheckout = (ingredients, history) => {
  return (dispatch, getState) => {
    dispatch(handleCheckout(ingredients, history));
    setTimeout(() => {
      dispatch(handleIsOrderProcessing());
      const order = getState().orderR.order;
      history.push({ pathname: "/checkout", order: order });
    }, 2000);
  };
};

export const placeOrder = () => {
  return {
    type: actionTypes.PLACE_ORDER,
  };
};

export const cancelCheckout = () => {
  return {
    type: actionTypes.CANCEL_CHECKOUT,
  };
};
