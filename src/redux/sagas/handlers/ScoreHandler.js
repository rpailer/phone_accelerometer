import { call, put, select } from "redux-saga/effects";
import { setPred } from "../../ducks/ScoreReducer";
import { scoreRequest } from "../requests/ScoreRequest";


export function* handleScoreRequest(action) {
  try {
    console.log("ScoreHandler.handleScoreRequest:");
    console.log(action);

    const state = yield select();
    //console.log(state);
    const response = yield call(scoreRequest, state.score.dataObj, state.score.scoreUrl);
    console.log("handleScoreRequest: ");
    console.log(response);
    yield put(setPred(response));
  } catch (error) {
    console.log(error);
  }
}

