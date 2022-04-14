const roleActions = {
  GET_ROLE_REQUEST: "GET_ROLE_REQUEST",
  GET_ROLE_SUCCESS: "GET_ROLE_SUCCESS",
  GET_ROLE_ERROR: "GET_ROLE_ERROR",

  getRoleRequest: () => ({
    type: roleActions.GET_ROLE_REQUEST,
  }),

  getRoleSuccess: (payload = {}) => ({
    type: roleActions.GET_ROLE_SUCCESS,
    payload,
  }),

  getRoleFailure: (payload = "", errors = {}) => ({
    type: roleActions.GET_ROLE_ERROR,
    payload,
    errors,
  }),
};

export default roleActions;
