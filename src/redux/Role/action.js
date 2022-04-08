const actions = {
  GET_ROLE_REQUEST: "GET_ROLE_REQUEST",
  GET_ROLE_SUCCESS: "GET_ROLE_SUCCESS",
  GET_ROLE_ERROR: "GET_ROLE_ERROR",

  /**
   * request to get duration.
   */
  getRoleRequest: () => ({
    type: actions.GET_ROLE_REQUEST,
  }),

  /**
   * when duration is successfull.
   */
  getRoleSuccess: (payload = {}) => ({
    type: actions.GET_ROLE_SUCCESS,
    payload,
  }),

  /**
   * when something went wrong with duration.
   */
  getRoleFailure: (payload = "", errors = {}) => ({
    type: actions.GET_ROLE_ERROR,
    payload,
    errors,
  }),
};

export default actions;
