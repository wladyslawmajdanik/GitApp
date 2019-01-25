import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { httpLink, REPO_KEY, SEARCH_KEY } from 'containers/main/config';
import { InputNetworkState } from 'containers/main/types';

export let requestCancelToken;

export const fetchRepos = searchText => {
  requestCancelToken = axios.CancelToken.source();

  return axios
    .get(httpLink + searchText, {
      cancelToken: requestCancelToken.token
    })
    .then(responseJson => {
      const responseSorted = responseJson.data.items
        .sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        })
        .reverse();
      saveDataToLocalStore(searchText, responseSorted);
      return responseSorted;
    });
};

export const countStars = selectedRepositories => {
  let numberOfStars = 0;
  selectedRepositories.forEach(repo => {
    numberOfStars = numberOfStars + repo.stargazers_count;
  });
  return numberOfStars;
};

export function saveDataToLocalStore(text: string, sortedRepositories) {
  AsyncStorage.multiSet([
    [REPO_KEY, JSON.stringify(sortedRepositories)],
    [SEARCH_KEY, text]
  ]).catch(error => {});
}

export const dataFormLocalStore = () => {
  return AsyncStorage.multiGet([REPO_KEY, SEARCH_KEY])
    .then(stores => {
      return {
        repositories: JSON.parse(stores[0][1]),
        inputState: {
          inputText: stores[1][1],
          network: InputNetworkState.NONE
        }
      };
    })
    .catch(error => {});
};
