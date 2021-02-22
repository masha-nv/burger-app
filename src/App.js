import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import OrderSummary from "./components/Layout/OrderSummary/OrderSummary";
import Backdrop from "./components/Layout/Backdrop/Backdrop";

const App = () => {
  return (
    <Layout>
      <BurgerBuilder />
    </Layout>
  );
};

export default App;
