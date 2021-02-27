import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import OrderSummary from "./components/Layout/OrderSummary/OrderSummary";
import Backdrop from "./components/Layout/Backdrop/Backdrop";
import { Route, Switch } from "react-router-dom";
import ContactForm from "./containers/ContactForm/ContactForm";
import CheckoutSummary from "./components/Checkout/CheckoutSummary";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={BurgerBuilder} />
          <Route path="/contact" component={ContactForm} />
          <Route
            path="/checkout"
            render={(routeProps) => <CheckoutSummary {...routeProps} />}
          />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/signin" component={Auth} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
