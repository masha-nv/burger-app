import * as actionType from "./action";

const initialState = {
  ingredients: [
    {
      ingredient: "Cheese",
      price: 3.23,
      qty: 0,
      type: "cheese",
    },
    {
      ingredient: "Bacon",
      price: 3.23,
      qty: 0,
      type: "bacon",
    },
    {
      ingredient: "Salad",
      price: 1.23,
      qty: 0,
      type: "salad",
    },
    {
      ingredient: "Meat",
      price: 4.23,
      qty: 0,
      type: "meat",
    },
  ],
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
    default:
      return state;
  }
};

export default reducer;
