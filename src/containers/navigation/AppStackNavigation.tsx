import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Colors from 'resources/Colors';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainScreen from 'containers/main/MainScreen';
import SelectedItemsScreen from 'containers/selectedItems/SelectedItemsScreen';
import { InputNetworkState, InputState } from 'containers/main/types';
import strings from 'resources/Strings';

const styles = StyleSheet.create({
  searchBox: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textField: {
    width: '90%'
  }
});

const _defaultConfig = {
  headerStyle: {
    backgroundColor: Colors.black,
    height: 80
  },
  headerTintColor: Colors.white
};

const MainStackConfig = {
  initialRouteName: 'Main'
};

export const mainNavigationOptions = (
  getRepositories,
  inputState: InputState
) => ({
  headerTitle: inputState ? (
    <View style={styles.searchBox}>
      <TextField
        textColor={Colors.white}
        tintColor={Colors.white}
        baseColor={Colors.white}
        containerStyle={styles.textField}
        lineWidth={0}
        activeLineWidth={0}
        disabledLineWidth={0}
        animationDuration={0}
        autoCapitalize="none"
        label={strings.search}
        onChangeText={text => {
          getRepositories(text);
        }}
        value={inputState.inputText ? inputState.inputText : undefined}
        error={inputState.errorMessage ? inputState.errorMessage : undefined}
      />
      {inputState.network === InputNetworkState.LOADING ? (
        <ActivityIndicator size="small" color={Colors.red} />
      ) : null}
    </View>
  ) : null
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: { ..._defaultConfig }
    },
    SelectedItems: {
      screen: SelectedItemsScreen,
      navigationOptions: { ..._defaultConfig }
    }
  },
  MainStackConfig
);

export const AppContainer = createAppContainer(RootStack);
