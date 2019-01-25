import { NavigationParams, StackActions } from 'react-navigation';

let _navigator;

function push(routeName: string, params?: NavigationParams) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params
    })
  );
}

export function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

export function navigateToSelectedItemsScreen() {
  push('SelectedItems',);
}
