import { InputNetworkState } from 'containers/main/types';
import { call, put, select } from 'redux-saga/effects';
import { timeForTypingMilliSeconds } from 'containers/main/config';
import strings from 'resources/Strings';
import { delay } from 'redux-saga';
import {
  REPOS_CHANGED,
  REPOS_DELETED,
  REPOS_LOADED,
  REPOS_LOADED_FAILED,
  REPOS_LOADED_LOCAL,
  REPOS_LOADING
} from 'saga/types';
import {
  requestCancelToken,
  countStars,
  dataFormLocalStore,
  fetchRepos
} from 'saga/main/mainSaga';

const getSelectedReposFromState = state => state.selectedRepositories;
const getReposFromState = state => state.repositories;

export function* getDataFormLocalStore() {
  const data = yield call(dataFormLocalStore);

  yield put({ type: REPOS_LOADED_LOCAL, data });
}

export function* getRepositories(data) {
  try {
    const searchText = data.searchText;
    if (!searchText) {
      return;
    }
    if (searchText.charAt(0) == searchText.charAt(0).toLowerCase()) {
      if (requestCancelToken) {
        requestCancelToken.cancel();
      }
      yield delay(timeForTypingMilliSeconds);
      const inputState = {
        network: InputNetworkState.LOADING
      };
      yield put({ type: REPOS_LOADING, inputState });
      const repositories = yield call(fetchRepos, searchText);
      if (repositories === undefined || repositories.length == 0) {
        const inputState = {
          errorMessage: strings.noResults,
          network: InputNetworkState.ERROR
        };
        yield put({ type: REPOS_LOADED_FAILED, inputState });
      } else {
        const inputState = {
          network: InputNetworkState.NONE
        };
        yield put({
          type: REPOS_LOADED,
          data: {
            repositories: repositories,
            numberOfStars: 0,
            selectedRepositories: [],
            inputState
          }
        });
      }
    } else {
      const inputState = {
        errorMessage: strings.upperCaseLetterError,
        network: InputNetworkState.ERROR
      };
      yield put({ type: REPOS_LOADED_FAILED, inputState });
    }
  } catch (error) {
    console.log(error);
    const inputState = {
      errorMessage: strings.errorFetching,
      network: InputNetworkState.ERROR
    };
    yield put({ type: REPOS_LOADED_FAILED, inputState });
  }
}

export function* changeSelectedRepositories(data) {
  let selectedRepositories = yield select(getSelectedReposFromState);

  if (data.props.isSelected) {
    selectedRepositories.unshift(data.props.repository);
  } else {
    const index = selectedRepositories.indexOf(data.props.repository);
    if (index > -1) {
      selectedRepositories.splice(index, 1);
    }
  }
  const numberOfStars = yield call(countStars, selectedRepositories);

  yield put({
    type: REPOS_CHANGED,
    data: {
      selectedRepositories,
      numberOfStars
    }
  });
}

export function* removeRepository(data) {
  let repositories = yield select(getReposFromState);
  let filteredRepositories = repositories.filter(
    item => item !== data.props.repository
  );
  let selectedRepositories = yield select(getSelectedReposFromState);
  let filteredSelectedRepositories = selectedRepositories.filter(
    item => item !== data.props.repository
  );
  let numberOfStars = yield call(countStars, filteredSelectedRepositories);
  yield put({
    type: REPOS_DELETED,
    data: {
      repositories: filteredRepositories,
      selectedRepositories: filteredSelectedRepositories,
      numberOfStars
    }
  });
}
