import { takeLatest } from "redux-saga/effects";
import { handleScoreRequest } from "./handlers/ScoreHandler";

import { TRIGGER_SCORING } from "../ducks/ScoreReducer";


export default function* watcherSaga() {
  yield takeLatest(TRIGGER_SCORING, handleScoreRequest);

}
