import roleActionss from "./action";

const initState = {
  loading: false,
  role: [],
};

export default (state = initState, roleActions) => {
  switch (roleActions.type) {
    case roleActionss.GET_ROLE_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
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
      };
    default:
      return state;
  }
};
