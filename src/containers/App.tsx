import React from 'React';
import { setTopLevelNavigator } from 'containers/navigation/NavigationService';
import { AppContainer } from 'containers/navigation/AppStackNavigation';
import { Provider, connect } from 'react-redux';
import createStore from 'redux/createStore';

const store = createStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer ref={navigator => setTopLevelNavigator(navigator)} />
      </Provider>
    );
  }
}
export default App;
