import actions from "./action";

const initState = {
  loading: false,
  message: null,
  role: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.GET_ROLE_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
      };
    case actions.GET_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        role: action.payload,
      };
    case actions.GET_ROLE_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
