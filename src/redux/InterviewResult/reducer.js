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
        action: action.type,
      };
    case actions.CREATE_INTERVIEW_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        action: action.type,
      };
    case actions.CREATE_INTERVIEW_RESULT_ERROR:
      return {
        ...state,
        loading: false,
        action: action.type,
      };

    //GET
    case actions.GET_INTERVIEW_RESULT_REQUEST:
      return {
        ...state,
        loading: true,
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
        action: action.type,
      };

    case actions.GET_SINGLE_INTERVIEW_RESULT_REQUEST:
      return {
        ...state,
        loading: true,
        action: action.type,
      };
    case actions.GET_SINGLE_INTERVIEW_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        interview: action.payload,
        action: action.type,
      };

    case actions.GET_SINGLE_INTERVIEW_RESULT_ERROR:
      return {
        ...state,
        loading: false,
        action: action.type,
      };

    //DELETE
    case actions.DELETE_INTERVIEW_RESULT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.DELETE_INTERVIEW_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actions.DELETE_INTERVIEW_RESULT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
