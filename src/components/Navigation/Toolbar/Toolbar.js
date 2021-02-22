import React, { Component } from "react";
import styles from "./Toolbar.module.css";
import HamburgerIcon from "./../HamburgerIcon/HamburgerIcon";
import Logo from "./../Logo/Logo";
import MenuLinks from "./../MenuLinks/MenuLinks";
import SideDrawer from "./../SideDrawer/SideDrawer";
import Backdrop from "./../../Layout/Backdrop/Backdrop";

class Toolbar extends Component {
  state = { isSideBarShowing: false };
  handleShowSideBar = () => {
    this.setState({ isSideBarShowing: true });
  };
  handleCloseSideBar = () => {
    this.setState({ isSideBarShowing: false });
  };
  render() {
    return (
      <header className={styles.Toolbar}>
        {this.state.isSideBarShowing && (
          <Backdrop handleHideBackdrop={this.handleCloseSideBar} />
        )}
        <HamburgerIcon handleShowSideBar={this.handleShowSideBar} />
        <Logo />
        <MenuLinks />
        {this.state.isSideBarShowing && (
          <SideDrawer handleCloseSideBar={this.handleCloseSideBar} />
        )}
      </header>
    );
  }
}

export default Toolbar;
