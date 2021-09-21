import { call, put, select, delay } from "redux-saga/effects";
import { addDataObj, setPred } from "../../ducks/ScoreReducer";
import { scoreRequest } from "../../requests/ScoreRequest";


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

export function* handleDeviceMotionEvent(action) {
  try {
    console.log("ScoreHandler.handleDeviceMotionEvent:");
    console.log(action);

    const state = yield select();
    yield delay(state.score.delay);
    //console.log(state);
    yield put(addDataObj(action.obj));
  } catch (error) {
    console.log(error);
  }
}
