import React from "react";
import styles from "./MenuLinks.module.css";

const MenuLinks = () => {
  return (
    <nav className={styles.Menu}>
      <ul className={styles.List}>
        <li>
          <a href="#">Locations</a>
        </li>
        <li>
          <a href="#">Orders</a>
        </li>
        <li>
          <a href="#">Menu</a>
        </li>
      </ul>
    </nav>
  );
};

export default MenuLinks;
