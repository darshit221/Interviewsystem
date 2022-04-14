import { all, takeEvery, takeLatest, put } from "redux-saga/effects";
import actions from "./action";
import { axiosPost, axiosGet, axiosDelete, axiosPut } from "../axiosHelper";
import { push } from "connected-react-router";

/**
 * Request to create activity report.
 */
export function* createInterviewResult({ interviewData }) {
  try {
    const { data } = yield axiosPost(interviewData, `submitInterView`);
    yield put(actions.createInterviewResultSuccess(data.data));
    yield put(push("/interviewresult"));
    alert("add successfully");
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
export function* getSingleInterviewResult({ interviewId }) {
  try {
    const { data } = yield axiosGet(`getInterViewResultDetails/${interviewId}`);
    yield put(actions.getSingleInterviewResultSuccess(data.data));
  } catch (error) {
    yield put(
      actions.geSingletInterviewResultFailure(error.message, error.data || {})
    );
  }
}

export function* deleteInterviewResult({ interviewId }) {
  const { data } = yield axiosDelete(`deleteInterViewResult/${interviewId}`);
  yield put(actions.getInterviewResultRequest());
}

export function* updateInterviewResult({ updatedData }) {
  const { interviewData, interviewId } = updatedData;

  try {
    const { data } = yield axiosPut(
      interviewData,
      `updateInterViewResult/${interviewId}`
    );
    yield put(actions.updateInterviewResultSuccess(data.data));
    yield put(actions.getInterviewResultRequest());
    yield put(push("/interviewresult"));
  } catch (error) {
    yield put(
      actions.updateInterviewResultFailure(error.message, error.data || {})
    );
  }
}

export default function* interviewSaga() {
  yield all([
    takeLatest(actions.CREATE_INTERVIEW_RESULT_REQUEST, createInterviewResult),
    takeEvery(
      actions.GET_SINGLE_INTERVIEW_RESULT_REQUEST,
      getSingleInterviewResult
    ),
    takeEvery(actions.GET_INTERVIEW_RESULT_REQUEST, getInterviewResult),
    takeEvery(actions.DELETE_INTERVIEW_RESULT_REQUEST, deleteInterviewResult),
    takeLatest(actions.UPDATE_INTERVIEW_RESULT_REQUEST, updateInterviewResult),
  ]);
}
