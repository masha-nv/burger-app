import * as actionTypes from "./actionTypes";

export const add_ingredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingrType: name,
  };
};

export const remove_ingredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingrType: name,
  };
};

export const setIngredientsState = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS_STATE,
    ingredients: ingredients,
  };
};

export const asyncSetIngredientsState = (ingredients) => {
  return (dispatch) => dispatch(setIngredientsState(ingredients));
};

// export const loginPlaceOrder = () => {
//   return {
//     type: actionTypes.LOGIN_PLACE_ORDER,
//   };
// };

// export const asyncLoginPlaceOrder = () => {
//   return (dispatch) => {};
// };

export const sortEnd = ({ oldIndex, newIndex }) => {
  return {
    type: actionTypes.SORT_END,
    oldIndex,
    newIndex,
  };
};
