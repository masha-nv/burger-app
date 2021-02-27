import React, { Component } from "react";
import Input from "./../../components/Input/Input";
import styles from "./Auth.module.css";
import {
  asyncAuthSuccess,
  componentMount,
  switchAuth,
} from "../../store/actions/authActionCreators";
import { connect } from "react-redux";
import { Spinner } from "../../Spinner/Spinner";
import { withRouter, Link } from "react-router-dom";

class Auth extends Component {
  state = {
    email: { value: "", errorMessage: "" },
    password: { value: "", errorMessage: "" },
    isValid: false,
  };

  componentDidMount() {
    this.props.onComponentMount();
  }

  static defaultProps = {
    formData: {
      email: {
        htmlFor: "email",
        inputtype: "input",
        label: "Email",
        name: "email",
        type: "text",
        id: "email",
      },
      password: {
        htmlFor: "password",
        inputtype: "input",
        label: "Password",
        name: "password",
        type: "text",
        id: "password",
      },
    },
  };

  isFormValid = () => {
    const errorMsgs = [];
    for (let key in this.state) {
      errorMsgs.push(this.state[key]);
    }
    const result = errorMsgs.reduce((acc, val) => {
      for (let key in val) {
        key === "errorMessage" && acc.push(val[key]);
      }
      return acc;
    }, []);
    const msgType = [];
    result.forEach((res) => {
      msgType.push(res.type);
    });
    return msgType.every((msg) => msg === "success");
  };

  handleChange = (name, e) => {
    this.setState({
      [name]: {
        value: e.target.value,
        errorMessage: this.handleErrorMessage(e),
      },
      isValid: this.isFormValid(),
    });
  };

  handleErrorMessage = (e) => {
    let errorMessage =
      e.target.value.trim().length < 6
        ? {
            msg: "Please lengthen this text to 6 characters or more",
            type: "error",
          }
        : { msg: "Looks Good!", type: "success" };
    return errorMessage;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { email, password } = this.state;
    this.props.onAuthSuccess(
      email.value,
      password.value,
      history,
      this.props.isSignUp,
      this.props.location.state
    );
  };

  render() {
    const inputs = [];
    for (let key in this.props.formData) {
      inputs.push(this.props.formData[key]);
    }
    const isValid = this.isFormValid();
    return (
      <div className={styles.Checkout}>
        {this.props.authFail ? (
          <>
            <h1>{this.props.errormessage}</h1>
            <p>
              go <Link to="/">back</Link>
            </p>
          </>
        ) : (
          <>
            {this.props.isLoggingIn ? <Spinner /> : null}
            <form className={styles.Form} onSubmit={this.handleSubmit}>
              <div className={styles.InputsContainer}>
                {inputs.map((input) => (
                  <Input
                    key={input.id}
                    errorMessage={this.state[input.name].errorMessage}
                    inputInfo={input}
                    handleChange={this.handleChange}
                  />
                ))}
              </div>
              <button
                className={isValid ? styles.SubmitBtn : styles.Invalid}
                disabled={!isValid}
              >
                {this.props.isSignUp ? "Sign up" : "Sign in"}
              </button>
              <p className={styles.HaveAnAccount}>
                {this.props.isSignUp
                  ? "Already have an account? "
                  : "Dont have an account? "}

                <span
                  onClick={this.props.onSwitchAuth}
                  className={styles.Signin}
                >
                  {this.props.isSignUp ? "Sign in" : "Sign up"}
                </span>
              </p>
            </form>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggingIn: state.authR.isLoggingIn,
    authFail: state.authR.authFail,
    errormessage: state.authR.errorMessage,
    isSignUp: state.authR.isSignUp,
    token: state.authR.localId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSuccess: (email, password, history, isSignup, prevPath) =>
      dispatch(asyncAuthSuccess(email, password, history, isSignup, prevPath)),
    onComponentMount: () => dispatch(componentMount()),
    onSwitchAuth: () => dispatch(switchAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
