import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Repository } from 'containers/main/types';
import RepositoryItem from 'components/main/RepositoriesItem';

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 5,
    flex:1
  }
});

interface RegulationsLisProps {
  repositories: Repository[];
  changeSelectedRepositories: (
    repository: Repository,
    isSelected: boolean
  ) => void;
  removeRepository: (repository: Repository) => void;
}

const renderItem = (item, changeSelectedRepositories, removeRepository) => {
  return (
    <RepositoryItem
      index={ item.index }
      repository={item.item}
      changeSelectedRepositories={changeSelectedRepositories}
      removeRepository={removeRepository}
    />
  );
};

const RepositoriesList = (props: RegulationsLisProps) => {
  return (
    <FlatList
      style={styles.list}
      data={props.repositories}
      keyExtractor={item => item.id + ''}
      renderItem={item =>
        renderItem(
          item,
          props.changeSelectedRepositories,
          props.removeRepository
        )
      }
    />
  );
};

export default RepositoriesList;
