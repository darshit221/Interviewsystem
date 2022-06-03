import { store } from "./store";
import authActions from "./Auth/action";

export default () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());
  });
