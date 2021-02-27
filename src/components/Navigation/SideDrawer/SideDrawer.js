import React from "react";
import styles from "./SideDrawer.module.css";
import { Link } from "react-router-dom";
import Avatar from "./../../../Avatar/Avatar";
import { connect } from "react-redux";
import { signOut } from "../../../store/actions/authActionCreators";

const SideDrawer = ({ handleCloseSideBar, isSignedIn, signOut }) => {
  return (
    <div className={styles.SideDrawer}>
      <div className={styles.Header}>
        <Avatar>
          <div className={styles.CloseButton} onClick={handleCloseSideBar}>
            <div></div>
            <div></div>
          </div>
        </Avatar>
        <div className={styles.Logo}>
          <Link to="/">BURGER BUILDER</Link>
        </div>
      </div>
      <hr />
      <ul className={styles.List}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/orders">Orders</a>
        </li>
        {isSignedIn ? (
          <li onClick={signOut}>
            <Link to="/auth">Sign out</Link>
          </li>
        ) : (
          <li>
            <Link to="/auth">Sign in/Sign up</Link>
          </li>
        )}
      </ul>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
