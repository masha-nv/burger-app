import * as actionTypes from "./../actions/actionTypes";

const initialState = {
  isLoggingIn: false,
  authFail: false,
  errorMessage: "",
  isSignUp: true,
  // userId: "",
  idToken: JSON.parse(window.localStorage.getItem("userId")),
  // localId: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        isLoggingIn: true,
      };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        authFail: false,
        isSignUp: true,
        // userId: action.userId,
        idToken: action.idToken,
        // localId: action.localId,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        authFail: true,
        errorMessage: action.error,
      };
    case actionTypes.COMPONENT_MOUNT:
      return {
        ...state,
        isLoggingIn: false,
        authFail: false,
        errorMessage: "",
        isSignUp: true,
      };
    case actionTypes.SWITCH_AUTH:
      return {
        ...state,
        isSignUp: !state.isSignUp,
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        idToken: JSON.parse(window.localStorage.getItem("userId")),
      };
    default:
      return state;
  }
};

export default authReducer;
