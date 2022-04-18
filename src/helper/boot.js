import { store } from "../redux/store";
import authActions from "../redux/Auth/action";

export default () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());
  });
