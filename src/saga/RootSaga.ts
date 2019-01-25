import {
  changeSelectedRepositories,
  getDataFormLocalStore,
  getRepositories,
  removeRepository
} from 'saga/saga';
import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import {
  GET_REPOS,
  GET_LOCAL_REPOS,
  CHANGE_SELECTED_REPOS,
  REMOVE_REPO
} from 'saga/types';

export default function* rootSaga() {
  all([
    yield takeLatest(GET_REPOS, getRepositories),
    yield takeEvery(GET_LOCAL_REPOS, getDataFormLocalStore),
    yield takeEvery(CHANGE_SELECTED_REPOS, changeSelectedRepositories),
    yield takeEvery(REMOVE_REPO, removeRepository)
  ]);
}
