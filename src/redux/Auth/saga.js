import { all, takeEvery, put, takeLatest } from "redux-saga/effects";
import actions from "./action";
import { axiosPost } from "../axiosHelper";
import { push } from "connected-react-router";
import { Routes } from "../../routes";

export function* loginRequest({ payload }) {
  console.log("first", payload);
  try {
    const { data } = yield axiosPost(payload, `login`);
    console.log("data: ", data.data);
    let { token } = data.data;
    if (token) {
      yield localStorage.setItem("auth_token", token);
      yield localStorage.setItem("user", JSON.stringify(data.data));
      yield put(actions.loginSuccess(data.data, token));
      yield put(push(Routes.InterviewResult.path));
    } else {
      throw new Error("Invalid credentials provided.");
    }
  } catch (error) {
    yield put(actions.loginFailure(error.message, error.data || {}));
  }
}

export default function* authSaga() {
  yield all([takeLatest(actions.LOGIN_REQUEST, loginRequest)]);
}
