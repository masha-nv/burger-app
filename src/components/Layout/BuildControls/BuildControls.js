import React from "react";
import styles from "./BuildControls.module.css";
import OrderSummary from "./../OrderSummary/OrderSummary";

const BuildControls = ({
  ingredients,
  handleAddIngredient,
  handleRemoveIngredient,
  isCheckingout,
  handlePlaceOrder,
  handleCheckout,
  handleCancelCheckout,
}) => {
  const prices = ingredients.map((ingr) => ingr.price * ingr.qty);
  const price = prices.reduce((acc, val) => {
    return (acc += val);
  }, 0);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Summary}>
        <h3>Order Price: ${parseFloat(price).toFixed(2)}</h3>
      </div>
      <ul>
        {ingredients.map((item, i) => (
          <>
            <li className={styles.Control} key={item.type + i}>
              <h3>{item.ingredient}</h3>
              <button onClick={() => handleAddIngredient(item.type)}>+</button>
              <button
                disabled={item.qty === 0}
                onClick={() => handleRemoveIngredient(item.type)}
              >
                -
              </button>
            </li>
          </>
        ))}
      </ul>
      {price > 0 && (
        <button className={styles.Order} onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
      {isCheckingout && (
        <OrderSummary
          price={price}
          ingredients={ingredients}
          handleCheckout={handleCheckout}
          handleCancelCheckout={handleCancelCheckout}
        />
      )}
    </div>
  );
};

export default BuildControls;
