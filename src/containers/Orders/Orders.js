import React, { Component } from "react";
import axios from "../../axios/axios";
import Order from "./../../components/Order/Order";
import styles from "./Orders.module.css";
import { connect } from "react-redux";
import { asyncFetchAllOrders } from "../../store/actions/orderActionCreators";
import { Link } from "react-router-dom";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchAllOrders(this.props.token);
  }

  render() {
    return (
      <div className={styles.Orders}>
        {this.props.token ? (
          <>
            <h1>You Orders</h1>
            {this.props.orders.length ? (
              <ul className={styles.List}>
                {this.props.orders.map((order) => (
                  <Order order={order} key={order.id} />
                ))}
              </ul>
            ) : (
              <p>No orders to diplay</p>
            )}
          </>
        ) : (
          <p>
            Please <Link to="/auth">login</Link> first
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderR.orders,
    token: state.authR.idToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAllOrders: (token) => dispatch(asyncFetchAllOrders(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
