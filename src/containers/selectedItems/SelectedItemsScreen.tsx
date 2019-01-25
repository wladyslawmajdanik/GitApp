import React from 'React';
import { connect } from 'react-redux';
import { Repository } from 'containers/main/types';
import SelectedItemsList from 'components/selectedItems/SelectedItemsList';

export interface SelectedItemsProps {
  selectedRepositories: Repository[];
  getSelectedRepos: () => void;
}

export const mapStateToProps = state => {
  return {
    selectedRepositories: state.selectedRepositories
  };
};

class SelectedItemsScreen extends React.Component<SelectedItemsProps> {
  render() {
    return (
      <SelectedItemsList
        selectedRepositories={this.props.selectedRepositories}
      />
    );
  }
}
export default connect(mapStateToProps)(SelectedItemsScreen);
