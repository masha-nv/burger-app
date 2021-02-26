export const calcPrice = (ingredients) => {
  ingredients.reduce((acc, val) => {
    return (acc += val["price"] * val["qty"]);
  }, 0);
};
