import { all, takeEvery, takeLatest, put } from "redux-saga/effects";
import actions from "./action";
import { axiosPost, axiosGet, axiosDelete } from "../axiosHelper";
import { push } from "connected-react-router";

/**
 * Request to create activity report.
 */
export function* createInterviewResult({ interviewData }) {
  try {
    const { data } = yield axiosPost(interviewData, `submitInterView`);
    console.log(data);
    yield put(actions.createInterviewResultSuccess(data.data));
    yield put(push("/interviewresult"));
  } catch (error) {
    yield put(
      actions.createInterviewResultFailure(error.message, error.data || {})
    );
  }
}

/**
 * Request to get activity list.
 */
export function* getInterviewResult() {
  try {
    const { data } = yield axiosGet(`getAllInterViewResultDetails`);
    yield put(actions.getInterviewResultSuccess(data.data));
  } catch (error) {
    yield put(
      actions.getInterviewResultFailure(error.message, error.data || {})
    );
  }
}
export function* getSingleInterviewResult({ userID }) {
  console.log(userID);
  try {
    const { data } = yield axiosGet(`getInterViewResultDetails/${userID}`);
    yield put(actions.getSingleInterviewResultSuccess(data.data));
  } catch (error) {
    yield put(
      actions.geSingletInterviewResultFailure(error.message, error.data || {})
    );
  }
}

export function* deleteInterviewResult({ userID }) {
  const { data } = yield axiosDelete(`deleteInterViewResult/${userID}`);
}

export default function* interviewSaga() {
  yield all([
    takeLatest(actions.CREATE_INTERVIEW_RESULT_REQUEST, createInterviewResult),
    takeEvery(actions.GET_INTERVIEW_RESULT_REQUEST, getInterviewResult),
    takeLatest(actions.DELETE_INTERVIEW_RESULT_REQUEST, deleteInterviewResult),
    takeLatest(
      actions.GET_SINGLE_INTERVIEW_RESULT_REQUEST,
      getSingleInterviewResult
    ),
  ]);
}
