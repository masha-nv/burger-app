import * as actionTypes from "../../store/actions/actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (userId, idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    idToken: idToken,
    localId: localId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const signOut = () => {
  window.localStorage.removeItem("userId");
  window.localStorage.removeItem("userEmail");
  return {
    type: actionTypes.SIGN_OUT,
  };
};

export const asyncAuthSuccess = (
  email,
  password,
  history,
  isSignup,
  prevPath
) => {
  console.log("prev path", prevPath);
  const baseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:";
  const signIn = "signInWithPassword";
  const signUp = "signUp";
  const key = "?key=AIzaSyA0LLUBzz9Tch4YZA0p7HzP8_mGSU1AoMc";

  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      password,
      email,
      returnSecureToken: true,
    };
    axios
      .post(
        isSignup ? baseUrl + signUp + key : baseUrl + signIn + key,
        authData
      )
      .then((response) => {
        const userId = response.data.email;
        const idToken = response.data.idToken;
        const localId = response.data.localId;
        dispatch(authSuccess(userId, idToken, localId));
        window.localStorage.setItem("userId", idToken);
        window.localStorage.setItem("userEmail", userId);
        prevPath === "/checkout" ? history.push(prevPath) : history.push("/");
      })
      .catch((e) => {
        dispatch(authFail(e.message));
      });
  };
};

export const componentMount = () => {
  return {
    type: actionTypes.COMPONENT_MOUNT,
  };
};

export const switchAuth = () => {
  return {
    type: actionTypes.SWITCH_AUTH,
  };
};
