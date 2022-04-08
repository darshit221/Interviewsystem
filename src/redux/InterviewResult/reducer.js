import actions from "./action";

const initState = {
  interview: {},
  interviewerList: [],
  loading: false,
  message: null,
  action: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.CREATE_INTERVIEW_RESULT_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        loading: true,
        action: action.type,
      };
    case actions.CREATE_INTERVIEW_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        interview: action.payload,
        loading: false,
        action: action.type,
      };
    case actions.CREATE_INTERVIEW_RESULT_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        loading: false,
        action: action.type,
      };
    case actions.GET_INTERVIEW_RESULT_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        action: action.type,
      };
    case actions.GET_INTERVIEW_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        interviewerList: action.payload,
        action: action.type,
      };
    case actions.GET_INTERVIEW_RESULT_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        action: action.type,
      };
    default:
      return state;
  }
};
