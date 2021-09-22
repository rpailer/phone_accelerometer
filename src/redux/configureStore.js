import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import ScoreReducer from "./ducks/ScoreReducer";
import TrainReducer from "./ducks/TrainReducer";
import watcherSaga from "./sagas/RootSaga";

const reducer = combineReducers({
  score: ScoreReducer,
  train: TrainReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;