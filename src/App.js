import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import OrderSummary from "./components/Layout/OrderSummary/OrderSummary";
import Backdrop from "./components/Layout/Backdrop/Backdrop";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./containers/LoginForm/LoginForm";
import CheckoutSummary from "./components/Checkout/CheckoutSummary";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={BurgerBuilder} />
          <Route path="/login" component={LoginForm} />
          <Route
            path="/checkout"
            render={(routeProps) => <CheckoutSummary {...routeProps} />}
          />
          <Route path="/orders" component={Orders} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
