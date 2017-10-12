import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { createStructuredSelector } from 'reselect';
import RootNavigation from './navigation/RootNavigation';
import LoginScreen from './screens/LoginScreen';
import configureStore from './store';
import appSelectors from './app/selectors/app';
import userSelectors from './app/selectors/user';
import { launchApp } from './app/actions/app';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const initialState = { };
const store = configureStore(initialState);
store.runSaga();

class App extends React.Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
    assetsAreLoaded: PropTypes.bool,
    launchApp: PropTypes.func,
    user: PropTypes.object,
  }

  componentWillMount() {
    this.props.launchApp();
  }

  render() {
    if (!this.props.assetsAreLoaded && !this.props.skipLoadingScreen) {
      return (<AppLoading />);
    }
    if (!this.props.user.authenticated) {
      return (<LoginScreen />);
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {Platform.OS === 'android' &&
          <View style={styles.statusBarUnderlay} />}
        <RootNavigation />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    launchApp: () => {
      dispatch(launchApp());
    },
  };
}

const mapStateToProps = (state) => createStructuredSelector({
  assetsAreLoaded: appSelectors.selectAssetsAreLoaded(state),
  user: userSelectors.selectUser(),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

const Root = () => (
  <Provider store={store}>
    <ReduxApp />
  </Provider>
);

export default Root;
