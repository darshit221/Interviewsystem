import { all, takeEvery, takeLatest, put } from "redux-saga/effects";
import actions from "./action";
import { axiosPost, axiosGet, axiosDelete } from "../axiosHelper";
import { push } from "connected-react-router";

/**
 * Request to create activity report.
 */
export function* createUser({ userData }) {
  try {
    const { data } = yield axiosPost(userData, `submitInterView`);
    console.log(data);
    yield put(actions.createUserSuccess(data.data));
    yield put(push("/interviewresult"));
  } catch (error) {
    yield put(actions.createUserFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get activity list.
 */
export function* getUser() {
  try {
    const { data } = yield axiosGet(`getAllInterViewResultDetails`);
    yield put(actions.getUserSuccess(data.data));
  } catch (error) {
    yield put(actions.getUserFailure(error.message, error.data || {}));
  }
}
export function* getSingleUser({ userID }) {
  console.log(userID);
  try {
    const { data } = yield axiosGet(`getInterViewResultDetails/${userID}`);
    yield put(actions.getSingleUserSuccess(data.data));
  } catch (error) {
    yield put(actions.geSingletUserFailure(error.message, error.data || {}));
  }
}

export function* deleteUser({ userID }) {
  const { data } = yield axiosDelete(`deleteInterViewResult/${userID}`);
}

export default function* userSaga() {
  yield all([
    takeLatest(actions.CREATE_USER_REQUEST, createUser),
    takeEvery(actions.GET_USER_REQUEST, getUser),
    takeLatest(actions.DELETE_USER_REQUEST, deleteUser),
    takeLatest(actions.GET_SINGLE_USER_REQUEST, getSingleUser),
  ]);
}
