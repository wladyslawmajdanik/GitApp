import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Repository } from 'containers/main/types';
import strings from 'resources/Strings';
import Colors from 'resources/Colors';
import Images from 'resources/Images';

const styles = StyleSheet.create({
  container: {
    height: 150,
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
  seeRepoContainer: {
    backgroundColor: Colors.purple,
    margin: 10,
    padding: 8,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  seeRepoText: {
    color: Colors.white,
    fontSize: 20
  }
});

interface SelectedItemProps {
  repository: Repository;
}

export default class SelectedItem extends React.Component<SelectedItemProps> {
  openWebView = () => {
    Linking.canOpenURL(this.props.repository.html_url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.repository.html_url);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
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
        </View>
        <View style={styles.starsContainer}>
          <Image source={Images.starsIcon} />
          <Text style={styles.text}>
            {this.props.repository.stargazers_count}
          </Text>
        </View>
        <TouchableHighlight
          style={styles.seeRepoContainer}
          onPress={this.openWebView}
        >
          <Text style={styles.seeRepoText}>{strings.seeRepo}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
