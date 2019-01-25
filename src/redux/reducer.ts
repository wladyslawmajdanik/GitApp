import { InputNetworkState } from 'containers/main/types';
import {
  CHANGE_SELECTED_REPOS,
  REMOVE_REPO,
  REPOS_CHANGED,
  REPOS_DELETED,
  REPOS_LOADED,
  REPOS_LOADED_FAILED,
  REPOS_LOADED_LOCAL,
  REPOS_LOADING
} from 'saga/types';

export default function reducer(state, action) {

  switch (action.type) {
    case REMOVE_REPO:
      return state;
    case CHANGE_SELECTED_REPOS:
      return state;
    case REPOS_LOADING:
     return assignToState(state, {
        inputState: action.inputState
      });
    case REPOS_DELETED:
      return assignToState(state, {
        repositories: action.data.repositories,
        selectedRepositories: action.data.selectedRepositories,
        numberOfStars: action.data.numberOfStars
      });
    case REPOS_CHANGED:
      return assignToState(state, {
        selectedRepositories: action.data.selectedRepositories,
        numberOfStars: action.data.numberOfStars
      });
    case REPOS_LOADED_LOCAL:
      return assignToState(state, {
        repositories: action.data.repositories,
        inputState: action.data.inputState
      });
    case REPOS_LOADED_FAILED:
      return assignToState(state, {
        inputState: action.inputState
      });

    case REPOS_LOADED:
      return assignToState(state, {
        repositories: action.data.repositories,
        selectedRepositories: action.data.selectedRepositories,
        numberOfStars: action.data.numberOfStars,
        inputState: action.data.inputState
      });
    default:
      return {
        repositories: [],
        numberOfStars: 0,
        selectedRepositories: [],
        inputState: {
          network: InputNetworkState.NONE
        }
      };
  }
}
const assignToState = (state, source) => {
  return Object.assign({}, state, source);
};
