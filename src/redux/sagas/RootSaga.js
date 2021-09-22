import { takeLatest } from "redux-saga/effects";
import { handleScoreRequest } from "./handlers/ScoreHandler";

import { TRIGGER_SCORING } from "../ducks/ScoreReducer";
import { TRIGGER_TRAIN } from "../ducks/TrainReducer";
import { handleTrainRequest } from "./handlers/TrainHandler";


export default function* watcherSaga() {
  yield takeLatest(TRIGGER_SCORING, handleScoreRequest);
  yield takeLatest(TRIGGER_TRAIN, handleTrainRequest);

}
