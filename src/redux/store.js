import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import reducers from "./rootReducer";
import rootSaga from "./rootSaga";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middleware = [thunk, sagaMiddleware, logger, routeMiddleware];

const store = createStore(
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  }),
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);
export { store, history };
