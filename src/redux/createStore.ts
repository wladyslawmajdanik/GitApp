import createSagaMiddleware from 'redux-saga';
import reducer from 'redux/reducer';
import { applyMiddleware, createStore } from 'redux';
import rootSaga from 'saga/RootSaga';

export default  () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
