const actions = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",

  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_ERROR: "LOGOUT_ERROR",

  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),

  loginRequest: (payload = {}) => ({
    type: actions.LOGIN_REQUEST,
    payload,
  }),

  loginSuccess: (payload = {}, token = "") => ({
    type: actions.LOGIN_SUCCESS,
    payload,
    token,
  }),

  loginFailure: (payload = "", errors = {}) => ({
    type: actions.LOGIN_ERROR,
    payload,
    errors,
  }),

  logout: () => ({
    type: actions.LOGOUT_REQUEST,
  }),

  logoutSuccess: () => ({
    type: actions.LOGOUT_SUCCESS,
  }),

  logoutError: () => ({
    type: actions.LOGOUT_ERROR,
  }),
};

export default actions;
