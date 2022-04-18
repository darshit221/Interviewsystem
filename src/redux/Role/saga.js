import { all, put, takeLatest } from "redux-saga/effects";
import roleActions from "./action";
import { axiosGet } from "../../helper/axiosHelper";

export function* getRole() {
  try {
    const { data } = yield axiosGet(`getAllRole`);
    console.warn("data", data);
    yield put(roleActions.getRoleSuccess(data.data));
  } catch (error) {
    yield put(roleActions.getRoleFailure(error.message, error.data || {}));
  }
}

export default function* roleSaga() {
  yield all([takeLatest(roleActions.GET_ROLE_REQUEST, getRole)]);
}
