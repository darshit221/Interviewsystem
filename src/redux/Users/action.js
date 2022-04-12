const actions = {
  CREATE_USER_REQUEST: "CREATE_USER_REQUEST",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_ERROR: "CREATE_USER_ERROR",

  UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR: "UPDATE_USER_ERROR",

  GET_USER_REQUEST: "GET_USER_REQUEST",
  GET_USER_SUCCESS: "GET_USER_SUCCESS",
  GET_USER_ERROR: "GET_USER_ERROR",

  GET_SINGLE_USER_REQUEST: "GET_SINGLE_USER_REQUEST",
  GET_SINGLE_USER_SUCCESS: "GET_SINGLE_USER_SUCCESS",
  GET_SINGLE_USER_ERROR: "GET_SINGLE_USER_ERROR",

  DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_ERROR: "DELETE_USER_ERROR",

  createUserRequest: (interviewData) => ({
    type: actions.CREATE_USER_REQUEST,
    interviewData,
  }),

  createUserSuccess: (payload = {}) => ({
    type: actions.CREATE_USER_SUCCESS,
    payload,
  }),

  createUserFailure: (payload = "", errors = {}) => ({
    type: actions.CREATE_USER_ERROR,
    payload,
    errors,
  }),

  getUserRequest: () => ({
    type: actions.GET_USER_REQUEST,
  }),

  getUserSuccess: (payload = {}) => ({
    type: actions.GET_USER_SUCCESS,
    payload,
  }),

  getUserFailure: (payload = "", errors = {}) => ({
    type: actions.GET_USER_ERROR,
    payload,
    errors,
  }),

  getSingleUserRequest: (userId) => ({
    type: actions.GET_SINGLE_USER_REQUEST,
    userId,
  }),

  getSingleUserSuccess: (payload = {}) => ({
    type: actions.GET_SINGLE_USER_SUCCESS,
    payload,
  }),

  geSingletUserFailure: (payload) => ({
    type: actions.GET_SINGLE_USER_ERROR,
    payload,
  }),

  deleteUserRequest: (userId) => ({
    type: actions.DELETE_USER_REQUEST,
    userId,
  }),

  deleteUserSuccess: (payload) => ({
    type: actions.DELETE_USER_SUCCESS,
    payload,
  }),

  deleteUserFailure: (payload = "", errors = {}) => ({
    type: actions.DELETE_USER_ERROR,
    payload,
  }),

  updateUserRequest: (updatedData) => ({
    type: actions.UPDATE_USER_REQUEST,
    updatedData,
  }),

  updateUserSuccess: (payload = {}) => ({
    type: actions.UPDATE_USER_SUCCESS,
    payload,
  }),

  updateUserFailure: (payload = "", errors = {}) => ({
    type: actions.UPDATE_USER_ERROR,
    payload,
    errors,
  }),
};
export default actions;
