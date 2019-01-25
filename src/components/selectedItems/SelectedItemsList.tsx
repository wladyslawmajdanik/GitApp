import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Repository } from 'containers/main/types';
import SelectedItem from 'components/selectedItems/SelectedItem';

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 5,
    flex: 1
  }
});

interface SelectedItemsListProps {
  selectedRepositories: Repository[];
}

const renderItem = item => {
  return <SelectedItem repository={item} />;
};

const SelectedItemsList = (props: SelectedItemsListProps) => {
  return (
    <FlatList
      style={styles.list}
      data={props.selectedRepositories}
      keyExtractor={item => item.id + ''}
      renderItem={item => renderItem(item.item)}
    />
  );
};

export default SelectedItemsList;
