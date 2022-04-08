import { all } from "redux-saga/effects";
import authSaga from "./Auth/saga";
import interviewSaga from "./InterviewResult/saga";
import roleSaga from "./Role/saga";

export default function* rootSaga() {
  yield all([authSaga(), roleSaga(), interviewSaga()]);
}
