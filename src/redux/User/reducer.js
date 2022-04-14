import actions from "./action";

const initState = {
  singleUser: {},
  userList: [],
  loading: false,
  message: null,
  action: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        action: action.type,
      };
    case actions.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        action: action.type,
      };
    case actions.CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        action: action.type,
      };

    case actions.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        action: action.type,
      };
    case actions.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userList: action.payload,
        action: action.type,
      };
    case actions.GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        action: action.type,
      };

    case actions.GET_SINGLE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        action: action.type,
      };
    case actions.GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        singleUser: action.payload,
        loading: false,
        action: action.type,
      };

    case actions.GET_SINGLE_USER_ERROR:
      return {
        ...state,
        loading: false,
        action: action.type,
      };

    case actions.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actions.DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actions.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        action: action.type,
      };
    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        action: action.type,
      };
    case actions.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        action: action.type,
      };

    default:
      return state;
  }
};
