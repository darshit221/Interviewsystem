import actions from "./action";

const initState = {
  user: {},

  token: null,
  message: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        token: null,
        loading: true,
        message: null,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        token: action.payload.token,
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        token: null,
        loading: false,
        message: action.payload,
      };
    case actions.LOGOUT_REQUEST:
      return {
        ...initState,
      };
    case actions.LOGOUT_SUCCESS:
      return {
        ...initState,
        user: {},
        token: null,
      };
    case actions.LOGOUT_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
