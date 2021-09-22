import { call, select } from "redux-saga/effects";
import { trainRequest } from "../requests/TrainRequest";


export function* handleTrainRequest(action) {
  try {
    console.log("TrainHandler.handleTrainRequest:");
    console.log(action);

    const state = yield select();
    //console.log(state);
    const response = yield call(trainRequest, state.train.dataObj, state.train.trainUrl);
    console.log("handleTrainRequest: ");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

