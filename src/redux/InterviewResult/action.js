const actions = {
  CREATE_INTERVIEW_RESULT_REQUEST: "CREATE_INTERVIEW_RESULT_REQUEST",
  CREATE_INTERVIEW_RESULT_SUCCESS: "CREATE_INTERVIEW_RESULT_SUCCESS",
  CREATE_INTERVIEW_RESULT_ERROR: "CREATE_INTERVIEW_RESULT_ERROR",

  GET_INTERVIEW_RESULT_REQUEST: "GET_INTERVIEW_RESULT_REQUEST",
  GET_INTERVIEW_RESULT_SUCCESS: "GET_INTERVIEW_RESULT_SUCCESS",
  GET_INTERVIEW_RESULT_ERROR: "GET_INTERVIEW_RESULT_ERROR",

  /**
   * request to create activity report.
   */
  createInterviewResult: (interviewData) => ({
    type: actions.CREATE_INTERVIEW_RESULT_REQUEST,
    interviewData,
  }),

  /**
   * when create activity report is successfull.
   */
  createInterviewResultSuccess: (payload = {}) => ({
    type: actions.CREATE_INTERVIEW_RESULT_SUCCESS,
    payload,
  }),

  /**
   * when something went wrong with create activity report.
   */
  createInterviewResultFailure: (payload = "", errors = {}) => ({
    type: actions.CREATE_INTERVIEW_RESULT_ERROR,
    payload,
    errors,
  }),

  /**
   * request to get activity report.
   */
  getInterviewResult: () => ({
    type: actions.GET_INTERVIEW_RESULT_REQUEST,
  }),

  /**
   * when get activity report is successfull.
   */
  getInterviewResultSuccess: (payload = {}) => ({
    type: actions.GET_INTERVIEW_RESULT_SUCCESS,
    payload,
  }),

  /**
   * when something went wrong with get activity report.
   */
  getInterviewResultFailure: (payload = "", errors = {}) => ({
    type: actions.GET_INTERVIEW_RESULT_ERROR,
    payload,
    errors,
  }),
};
export default actions;
