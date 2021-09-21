import { takeLatest } from "redux-saga/effects";
import { handleDeviceMotionEvent, handleScoreRequest } from "./handlers/ScoreHandler";

import { SET_ACCELERATION_EVENT, SET_ORIENTATION_EVENT, TRIGGER_SCORING } from "../ducks/ScoreReducer";


export default function* watcherSaga() {
  yield takeLatest(SET_ORIENTATION_EVENT, handleDeviceMotionEvent);
  yield takeLatest(SET_ACCELERATION_EVENT, handleDeviceMotionEvent);
  yield takeLatest(TRIGGER_SCORING, handleScoreRequest);

}
