import { all, takeEvery, put, takeLatest } from "redux-saga/effects";
import actions from "./action";
import { axiosPost } from "../../Helper/axiosHelper";
import { push } from "connected-react-router";
import { routes } from "../../routes";
import { clearToken, getToken } from "../../Helper/utility";

export function* loginRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, `login`);

    let { token } = data.data;
    if (token) {
      yield localStorage.setItem("auth_token", token);
      yield localStorage.setItem("user", JSON.stringify(data.data));
      yield put(actions.loginSuccess(data.data, token));
      yield put(push(routes.InterviewResult.path));
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    yield put(actions.loginFailure(error.message, error.data || {}));
  }
}

export function* checkAuthorization() {
  const token = getToken().get("authToken");

  const user = getToken().get("user");
  if (token && user) {
    yield put(actions.loginSuccess(user, token));
  } else {
    clearToken();
    yield put(push("/"));
  }
}

export function* logout() {
  try {
    clearToken();
    yield put(actions.logoutSuccess());
    yield put(push("/"));
  } catch (error) {
    yield put(actions.logoutError());
  }
}
export default function* authSaga() {
  yield all([
    takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorization),
    takeLatest(actions.LOGIN_REQUEST, loginRequest),
    takeLatest(actions.LOGOUT_REQUEST, logout),
  ]);
}
