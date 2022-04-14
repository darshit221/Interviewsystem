import roleActionss from "./action";

const initState = {
  loading: false,
  message: null,
  role: [],
};

export default (state = initState, roleActions) => {
  switch (roleActions.type) {
    case roleActionss.GET_ROLE_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
      };
    case roleActionss.GET_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        role: roleActions.payload,
      };
    case roleActionss.GET_ROLE_ERROR:
      return {
        ...state,
        loading: false,
        message: roleActions.payload,
      };
    default:
      return state;
  }
};
