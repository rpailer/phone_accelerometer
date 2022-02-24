import { call } from "redux-saga/effects";
import { trainRequest } from "../requests/TrainRequest";


export function* handleTrainRequest(action) {
  try {
    console.log("TrainHandler.handleTrainRequest:");
    console.log(action);

    const response = yield call(trainRequest, action.dataObj, action.url, action.token);
    console.log("handleTrainRequest: ");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

