import React from "react";
import styles from "./Layout.module.css";
import Toolbar from "./../Navigation/Toolbar/Toolbar";
import Backdrop from "./Backdrop/Backdrop";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Toolbar />
      <main className={styles.content}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
