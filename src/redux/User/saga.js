import { all, takeEvery, takeLatest, put } from "redux-saga/effects";
import actions from "./action";
import { axiosPost, axiosGet, axiosDelete, axiosPut } from "../axiosHelper";
import { push } from "connected-react-router";

/**
 * Request to create activity report.
 */
export function* createUser({ userData }) {
  try {
    const { data } = yield axiosPost(userData, `register`);
    console.log(data);
    yield put(actions.createUserSuccess(data.data));
    yield put(push("/user"));
    alert("add");
  } catch (error) {
    yield put(actions.createUserFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get activity list.
 */
export function* getUser() {
  try {
    const { data } = yield axiosGet(`getAllUsersDetails`);
    yield put(actions.getUserSuccess(data.data));
  } catch (error) {
    yield put(actions.getUserFailure(error.message, error.data || {}));
  }
}
export function* getSingleUser({ userId }) {
  console.log(userId);
  try {
    const { data } = yield axiosGet(`getUserDetails/${userId}`);
    console.log("data", data);
    yield put(actions.getSingleUserSuccess(data.data));
  } catch (error) {
    yield put(actions.geSingletUserFailure(error.message, error.data || {}));
  }
}

export function* deleteUser({ userId }) {
  const { data } = yield axiosDelete(`deleteUser/${userId}`);
  yield put(actions.getUserRequest());
}

export function* updateUser({ updatedData }) {
  const { userData, userId } = updatedData;
  console.log("dafdasfasdfasdf", userData, userId);

  try {
    const { data } = yield axiosPut(userData, `updateUserDetails/${userId}`);
    console.log("reaponse......", data);
    yield put(actions.updateUserSuccess(data.data));
    yield put(actions.getUserRequest());
    yield put(push("/user"));
  } catch (error) {
    yield put(actions.updateUserFailure(error.message, error.data || {}));
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(actions.CREATE_USER_REQUEST, createUser),
    takeEvery(actions.GET_SINGLE_USER_REQUEST, getSingleUser),
    takeEvery(actions.GET_USER_REQUEST, getUser),
    takeEvery(actions.DELETE_USER_REQUEST, deleteUser),
    takeLatest(actions.UPDATE_USER_REQUEST, updateUser),
  ]);
}
