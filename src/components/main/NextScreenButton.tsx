import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { navigateToSelectedItemsScreen } from 'containers/navigation/NavigationService';
import Colors from 'resources/Colors';
import strings from 'resources/Strings';

const styles = StyleSheet.create({
  button: {
    height:50,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 18,
  }
});

const NextScreenButton = () => {
  return (
    <TouchableHighlight onPress={() => navigateToSelectedItemsScreen()}>
      <View style={styles.button}>
        <Text style={styles.text}>{strings.summary}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default NextScreenButton;
