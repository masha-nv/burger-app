import * as actionTypes from "../actions/actionTypes";
import { calcPrice } from "./../../utils/calcPrice";
const initialState = {
  isCheckingout: false,
  isOrderProcessing: false,
  order: null,
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CHECKOUT:
      return {
        ...state,
        order: {
          ingredients: action.ingredients,
          totalPrice: calcPrice(action.ingredients),
          id: Math.random(),
        },
        isCheckingout: false,
        isOrderProcessing: true,
      };
    case actionTypes.ORDER_PROCESSING:
      return { ...state, isOrderProcessing: false };
    case actionTypes.PLACE_ORDER: {
      return {
        ...state,
        isCheckingout: true,
      };
    }
    case actionTypes.CANCEL_CHECKOUT: {
      return {
        ...state,
        isCheckingout: false,
      };
    }
    case actionTypes.FETCH_ALL_ORDERS: {
      return {
        ...state,
        orders: action.orders,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
