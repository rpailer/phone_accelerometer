import { takeLatest } from "redux-saga/effects";
import { handleOrientationEvent, handleScoreRequest } from "./handlers/ScoreHandler";

import { SET_ORIENTATION_EVENT, TRIGGER_SCORING } from "../ducks/ScoreReducer";


export default function* watcherSaga() {
  yield takeLatest(SET_ORIENTATION_EVENT, handleOrientationEvent);
  yield takeLatest(TRIGGER_SCORING, handleScoreRequest);

}
