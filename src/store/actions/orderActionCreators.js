import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios";

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

export const fetchAllOrders = (orders) => {
  return {
    type: actionTypes.FETCH_ALL_ORDERS,
    orders: orders,
  };
};

export const asyncFetchAllOrders = (localId) => {
  return (dispatch, getState) => {
    const userId = getState().authR.userId;
    console.log("get state here", getState());
    const orders = [];
    axios
      .get("/myOrders.json?auth=" + localId)
      .then((response) => {
        console.log("RESPONSE", response);
        const result = Object.entries(response.data);
        for (let i = 0; i < result.length; i++) {
          result[i][1].userId === userId &&
            orders.push({ ...result[i][1], id: result[i][0] });
        }
        dispatch(fetchAllOrders(orders));
      })
      .catch((e) => console.log(e));
  };
};
