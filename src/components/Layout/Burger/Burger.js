import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./Burger.module.css";
import { SortableContainer } from "react-sortable-hoc";

const Burger = SortableContainer(({ ingredients }) => {
  const getIngredients = () => {
    const burgerIngredients = [];
    for (let ingr of ingredients) {
      if (ingr.qty > 0) {
        burgerIngredients.push(
          Array.from({ length: ingr.qty }).fill(ingr.type)
        );
      }
    }
    return burgerIngredients.flat();
  };

  let ingrs =
    getIngredients().length > 0 ? (
      getIngredients().map((ingr, i) => (
        <BurgerIngredient index={i} value={ingr} key={ingr + i} type={ingr} />
      ))
    ) : (
      <p>Please add ingredients</p>
    );
  return (
    <div className={styles.Content}>
      <BurgerIngredient type="bread-top" />
      {ingrs}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
});

export default Burger;
