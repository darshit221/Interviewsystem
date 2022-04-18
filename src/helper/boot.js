import { store } from "../Redux/store";
import authActions from "../Redux/Auth/action";

export default () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());
  });
