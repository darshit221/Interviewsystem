import { all, takeEvery, put, takeLatest } from "redux-saga/effects";
import actions from "./action";
import { axiosGet } from "../axiosHelper";

/**
 * Request to get duration list.
 */
export function* getRole() {
  try {
    const { data } = yield axiosGet(`getAllRole`);
    console.warn("data", data);
    yield put(actions.getRoleSuccess(data.data));
  } catch (error) {
    yield put(actions.getRoleFailure(error.message, error.data || {}));
  }
}

export default function* roleSaga() {
  yield all([takeLatest(actions.GET_ROLE_REQUEST, getRole)]);
}
