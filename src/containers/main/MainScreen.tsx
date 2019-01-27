import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InputState, Repository } from 'containers/main/types';
import RepositoriesList from 'components/main/RepositoriesList';
import NextScreenButton from 'components/main/NextScreenButton';
import StarsCounter from 'components/main/StarsCounter';
import { connect } from 'react-redux';
import { mainNavigationOptions } from 'containers/navigation/AppStackNavigation';
import { NavigationScreenProp } from 'react-navigation';
import {
  changeSelectedRepositoriesAction,
  getDataFormLocalStoreAction,
  getRepositoriesAction,
  removeRepositoryAction
} from 'saga/action';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export const mapDispatchToProps = dispatch => {
  return {
    getRepositories: searchText => {
      dispatch(getRepositoriesAction(searchText));
    },
    getDataFormLocalStore: () => {
      dispatch(getDataFormLocalStoreAction());
    },
    changeSelectedRepositories: (repository, isSelected) => {
      dispatch(changeSelectedRepositoriesAction(repository, isSelected));
    },
    removeRepository: repository => {
      dispatch(removeRepositoryAction(repository));
    }
  };
};

export const mapStateToProps = state => {
  return {
    numberOfStars: state.numberOfStars,
    repositories: state.repositories,
    selectedRepositories: state.selectedRepositories,
    inputState: state.inputState
  };
};

export interface MainProps {
  selectedRepositories: Repository[];
  numberOfStars: number;
  inputState: InputState;
  repositories: Repository[];
  navigation: NavigationScreenProp<any>;
  changeSelectedRepositories: (
    repository: Repository,
    isSelected: boolean
  ) => void;
  getDataFormLocalStore: () => void;
  removeRepository: (repository: Repository) => void;
  getRepositories: () => void;
}

class MainScreen extends React.PureComponent<MainProps> {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return mainNavigationOptions(params.getRepositories, params.inputState);
  };

  componentDidMount() {
    this.props.navigation.setParams({
      getRepositories: this.props.getRepositories,
      inputState: this.props.inputState
    });
    this.props.getDataFormLocalStore();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.inputState != nextProps.inputState) {
      this.props.navigation.setParams({
        getRepositories: nextProps.getRepositories,
        inputState: nextProps.inputState
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RepositoriesList
          removeRepository={this.props.removeRepository}
          repositories={this.props.repositories}
          changeSelectedRepositories={this.props.changeSelectedRepositories}
        />
        <StarsCounter numberOfStars={this.props.numberOfStars} />
        <NextScreenButton numberOfStars={this.props.numberOfStars} />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
