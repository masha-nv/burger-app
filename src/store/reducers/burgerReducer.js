import * as actionType from "../actions/actionTypes";
import arrayMove from "array-move";

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
    case actionType.REMOVE_INGREDIENT:
      const ingredients = state.ingredients.map((ingredient) =>
        ingredient.type === action.ingrType
          ? { ...ingredient, qty: ingredient.qty - 1 }
          : ingredient
      );
      return {
        ...state,
        ingredients,
      };

    case actionType.SET_INGREDIENTS_STATE:
      return {
        ...state,
        ingredients: action.ingredients,
      };

    case actionType.SORT_END:
      return {
        ...state,
        ingredients: arrayMove(
          state.ingredients,
          action.oldIndex,
          action.newIndex
        ),
      };

    default:
      return state;
  }
};

export default reducer;
