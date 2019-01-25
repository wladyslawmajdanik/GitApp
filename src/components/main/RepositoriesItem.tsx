import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Animated
} from 'react-native';
import { Repository } from 'containers/main/types';
import Colors from 'resources/Colors';
import Images from 'resources/Images';
import CheckBox from 'react-native-check-box';
import strings from 'resources/Strings';

const ANIMATION_DURATION = 500;
const ANIMATION_DELAY = 250;
const ROW_HEIGHT = 150;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    backgroundColor: Colors.black
  },
  header: {
    flexDirection: 'row'
  },
  textContainer: {
    width: 0,
    flexGrow: 1
  },
  text: {
    marginLeft: 10,
    color: Colors.white,
    fontSize: 18
  },
  checkBox: {
    margin: 5
  },
  avatar: {
    height: 50,
    width: 50
  },
  starsContainer: {
    margin: 10,
    position: 'absolute',
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  deleteContainer: {
    margin: 10,
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});

interface RepositoryItemProps {
  index: number;
  repository: Repository;
  changeSelectedRepositories: (
    repository: Repository,
    isSelected: boolean
  ) => void;
  removeRepository: (repository: Repository) => void;
}

interface RepositoryItemState {
  isSelected: boolean;
  scaleValue: any;
}

export default class RepositoryItem extends React.Component<
  RepositoryItemProps,
  RepositoryItemState
> {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      scaleValue: new Animated.Value(0)
    };
  }

  animatedRowStyle = () => [
    [
      styles.container,
      { opacity: this.state.scaleValue },
      {
        transform: [
          { scale: this.state.scaleValue },
          {
            rotate: this.state.scaleValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['35deg', '0deg'],
              extrapolate: 'clamp'
            })
          }
        ]
      },
      {
        height: this.state.scaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, ROW_HEIGHT],
          extrapolate: 'clamp'
        })
      }
    ]
  ];

  _setSelected = () => {
    this.setState({ isSelected: !this.state.isSelected }, () => {
      this.props.changeSelectedRepositories(
        this.props.repository,
        this.state.isSelected
      );
    });
  };

  _remove = () => {
    this.props.removeRepository(this.props.repository);
  };

  _animateOnRemove = () => {
    Animated.timing(this.state.scaleValue, {
      toValue: 0,
      duration: ANIMATION_DURATION
    }).start(() => this._remove());
  };

  _animateOnStart = () => {
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      delay: this.props.index * ANIMATION_DELAY
    }).start();
  };

  componentDidMount() {
    this._animateOnStart();
  }

  render() {
    return (
      <Animated.View style={this.animatedRowStyle()}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: this.props.repository.owner.avatar_url }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1}>
              {strings.name} {this.props.repository.name}
            </Text>
            <Text style={styles.text} numberOfLines={1}>
              {strings.author} {this.props.repository.owner.login}
            </Text>
          </View>
          <CheckBox
            style={styles.checkBox}
            isChecked={this.state.isSelected}
            checkBoxColor={Colors.red}
            onClick={this._setSelected}
          />
        </View>
        <View style={styles.starsContainer}>
          <Image source={Images.starsIcon} />
          <Text style={styles.text}>
            {this.props.repository.stargazers_count}
          </Text>
        </View>
        <TouchableHighlight
          style={styles.deleteContainer}
          onPress={this._animateOnRemove}
        >
          <Image source={Images.deleteIcon} />
        </TouchableHighlight>
      </Animated.View>
    );
  }
}
