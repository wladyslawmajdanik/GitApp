import { CHANGE_SELECTED_REPOS, GET_LOCAL_REPOS, GET_REPOS, REMOVE_REPO } from 'saga/types';

export function getRepositories(searchText) {
  return {
    type: GET_REPOS,
    searchText
  };
}
export function getDataFormLocalStore() {
  return{type:GET_LOCAL_REPOS}
}

export function changeSelectedRepositories(repository, isSelected) {
  return  {
    type: CHANGE_SELECTED_REPOS,
    props: { repository, isSelected }
}}

export function removeRepository(repository) {
  return {
    type: REMOVE_REPO,
    props: { repository }
  }}
