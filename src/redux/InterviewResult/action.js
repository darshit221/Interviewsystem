const actions = {
  CREATE_INTERVIEW_RESULT_REQUEST: "CREATE_INTERVIEW_RESULT_REQUEST",
  CREATE_INTERVIEW_RESULT_SUCCESS: "CREATE_INTERVIEW_RESULT_SUCCESS",
  CREATE_INTERVIEW_RESULT_ERROR: "CREATE_INTERVIEW_RESULT_ERROR",

  UPDATE_INTERVIEW_RESULT_REQUEST: "UPDATE_INTERVIEW_RESULT_REQUEST",
  UPDATE_INTERVIEW_RESULT_SUCCESS: "UPDATE_INTERVIEW_RESULT_SUCCESS",
  UPDATE_INTERVIEW_RESULT_ERROR: "UPDATE_INTERVIEW_RESULT_ERROR",

  GET_INTERVIEW_RESULT_REQUEST: "GET_INTERVIEW_RESULT_REQUEST",
  GET_INTERVIEW_RESULT_SUCCESS: "GET_INTERVIEW_RESULT_SUCCESS",
  GET_INTERVIEW_RESULT_ERROR: "GET_INTERVIEW_RESULT_ERROR",

  GET_SINGLE_INTERVIEW_RESULT_REQUEST: "GET_SINGLE_INTERVIEW_RESULT_REQUEST",
  GET_SINGLE_INTERVIEW_RESULT_SUCCESS: "GET_SINGLE_INTERVIEW_RESULT_SUCCESS",
  GET_SINGLE_INTERVIEW_RESULT_ERROR: "GET_SINGLE_INTERVIEW_RESULT_ERROR",

  DELETE_INTERVIEW_RESULT_REQUEST: "DELETE_INTERVIEW_RESULT_REQUEST",
  DELETE_INTERVIEW_RESULT_SUCCESS: "DELETE_INTERVIEW_RESULT_SUCCESS",
  DELETE_INTERVIEW_RESULT_ERROR: "DELETE_INTERVIEW_RESULT_ERROR",

  createInterviewResultRequest: (interviewData) => ({
    type: actions.CREATE_INTERVIEW_RESULT_REQUEST,
    interviewData,
  }),

  createInterviewResultSuccess: (payload = {}) => ({
    type: actions.CREATE_INTERVIEW_RESULT_SUCCESS,
    payload,
  }),

  createInterviewResultFailure: (payload = "", errors = {}) => ({
    type: actions.CREATE_INTERVIEW_RESULT_ERROR,
    payload,
    errors,
  }),

  getInterviewResultRequest: () => ({
    type: actions.GET_INTERVIEW_RESULT_REQUEST,
  }),

  getInterviewResultSuccess: (payload = {}) => ({
    type: actions.GET_INTERVIEW_RESULT_SUCCESS,
    payload,
  }),

  getInterviewResultFailure: (payload = "", errors = {}) => ({
    type: actions.GET_INTERVIEW_RESULT_ERROR,
    payload,
    errors,
  }),

  getSingleInterviewResultRequest: (interviewId) => ({
    type: actions.GET_SINGLE_INTERVIEW_RESULT_REQUEST,
    interviewId,
  }),

  getSingleInterviewResultSuccess: (payload = {}) => ({
    type: actions.GET_SINGLE_INTERVIEW_RESULT_SUCCESS,
    payload,
  }),

  geSingletInterviewResultFailure: (payload) => ({
    type: actions.GET_SINGLE_INTERVIEW_RESULT_ERROR,
    payload,
  }),

  deleteInterviewResultRequest: (interviewId) => ({
    type: actions.DELETE_INTERVIEW_RESULT_REQUEST,
    interviewId,
  }),

  deleteInterviewResultSuccess: (payload) => ({
    type: actions.DELETE_INTERVIEW_RESULT_SUCCESS,
    payload,
  }),

  deleteInterviewResultFailure: (payload = "", errors = {}) => ({
    type: actions.DELETE_INTERVIEW_RESULT_ERROR,
    payload,
  }),

  updateInterviewResultRequest: (updatedData) => ({
    type: actions.UPDATE_INTERVIEW_RESULT_REQUEST,
    updatedData,
  }),

  updateInterviewResultSuccess: (payload = {}) => ({
    type: actions.UPDATE_INTERVIEW_RESULT_SUCCESS,
    payload,
  }),

  updateInterviewResultFailure: (payload = "", errors = {}) => ({
    type: actions.UPDATE_INTERVIEW_RESULT_ERROR,
    payload,
    errors,
  }),
};
export default actions;
