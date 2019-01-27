import { CHANGE_SELECTED_REPOS, GET_LOCAL_REPOS, GET_REPOS, REMOVE_REPO } from 'saga/types';

export function getRepositoriesAction(searchText) {
  return {
    type: GET_REPOS,
    searchText
  };
}
export function getDataFormLocalStoreAction() {
  return{type:GET_LOCAL_REPOS}
}

export function changeSelectedRepositoriesAction(repository, isSelected) {
  return  {
    type: CHANGE_SELECTED_REPOS,
    props: { repository, isSelected }
}}

export function removeRepositoryAction(repository) {
  return {
    type: REMOVE_REPO,
    props: { repository }
  }}
