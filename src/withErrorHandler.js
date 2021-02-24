import React, { Component } from "react";
import Backdrop from "./components/Layout/Backdrop/Backdrop";
import styles from "./withErrorHandler.module.css";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null };
    componentDidMount() {
      axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
      axios.interceptors.response.use((response, error) => {
        console.log(error);
        this.setState({ error });
        return response;
      });
    }
    closeBackdrop = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <>
          {this.state.error && (
            <Backdrop handleHideBackdrop={this.closeBackdrop}>
              <span className={styles.withError}>
                <p>Something went wrong...{this.state.error.message}</p>
              </span>
            </Backdrop>
          )}
          <WrappedComponent {...this.props} />;
        </>
      );
    }
  };
};

export default withErrorHandler;
