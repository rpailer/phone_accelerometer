import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import ScoreReducer from "./ducks/ScoreReducer";
import watcherSaga from "./sagas/RootSaga";

const reducer = combineReducers({
  score: ScoreReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;