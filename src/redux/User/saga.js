import { all, takeEvery, takeLatest, put } from "redux-saga/effects";
import actions from "./action";
import {
  axiosPost,
  axiosGet,
  axiosDelete,
  axiosPut,
} from "../../helper/axiosHelper";
import { push } from "connected-react-router";

export function* createUser({ userData }) {
  try {
    const { data } = yield axiosPost(userData, `register`);

    yield put(actions.createUserSuccess(data.data));
    yield put(push("/user"));
  } catch (error) {
    yield put(actions.createUserFailure(error.message, error.data || {}));
  }
}

export function* getUser() {
  try {
    const { data } = yield axiosGet(`getAllUsersDetails`);
    yield put(actions.getUserSuccess(data.data));
  } catch (error) {
    yield put(actions.getUserFailure(error.message, error.data || {}));
  }
}
export function* getSingleUser({ userId }) {
  try {
    const { data } = yield axiosGet(`getUserDetails/${userId}`);

    yield put(actions.getSingleUserSuccess(data.data));
  } catch (error) {
    yield put(actions.geSingletUserFailure(error.message, error.data || {}));
  }
}

export function* deleteUser({ userId }) {
  yield axiosDelete(`deleteUser/${userId}`);
  yield put(actions.getUserRequest());
}

export function* updateUser({ updatedData }) {
  const { userData, userId } = updatedData;

  try {
    const { data } = yield axiosPut(userData, `updateUserDetails/${userId}`);

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
