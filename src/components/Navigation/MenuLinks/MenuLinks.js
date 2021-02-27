import React from "react";
import styles from "./MenuLinks.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../../store/actions/authActionCreators";

const MenuLinks = (props) => {
  // console.log(this.props);
  return (
    <nav className={styles.Menu}>
      <ul className={styles.List}>
        <li>
          <NavLink activeClassName={styles.Active} exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={styles.Active} to="/orders">
            Orders
          </NavLink>
        </li>
        {props.isSignedIn ? (
          <li onClick={props.signOut}>
            <NavLink activeClassName={styles.Active} to="/auth">
              Sign Out
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink activeClassName={styles.Active} to="/auth">
              Signin/Signup
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.authR.idToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuLinks);
