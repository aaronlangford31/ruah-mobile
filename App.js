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
import { loadAppAssets } from './app/actions/app';
import { appSubmitLogin } from './app/actions/user';

const initialState = { };
const store = configureStore(initialState);
store.runSaga();

class App extends React.Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
    assetsAreLoaded: PropTypes.bool,
    loadAppAssets: PropTypes.func,
    user: PropTypes.object,
    appSubmitLogin: PropTypes.func,
  }

  componentWillMount() {
    this.props.loadAppAssets();
    this.props.appSubmitLogin();
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
    loadAppAssets: () => {
      dispatch(loadAppAssets());
    },
    appSubmitLogin: () => {
      dispatch(appSubmitLogin());
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
