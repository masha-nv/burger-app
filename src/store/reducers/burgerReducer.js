import * as actionType from "../actions/actionTypes";

const initialState = {
  ingredients: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT: {
      const ingredients = state.ingredients.map((ingredient) =>
        ingredient.type === action.ingrType
          ? { ...ingredient, qty: ingredient.qty + 1 }
          : ingredient
      );
      return {
        ...state,
        ingredients,
      };
    }
    case actionType.REMOVE_INGREDIENT: {
      const ingredients = state.ingredients.map((ingredient) =>
        ingredient.type === action.ingrType
          ? { ...ingredient, qty: ingredient.qty - 1 }
          : ingredient
      );
      return {
        ...state,
        ingredients,
      };
    }
    case actionType.SET_INGREDIENTS_STATE: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    default:
      return state;
  }
};

export default reducer;
