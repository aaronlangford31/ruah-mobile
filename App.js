import React from 'react';
import { Provider, connect } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { createStructuredSelector } from 'reselect';
import RootNavigation from './navigation/RootNavigation';
import configureStore from './store';
import appSelectors from './app/selectors/app';
import { loadAppAssets } from './app/actions/app';

const initialState = { };
const store = configureStore(initialState);
store.runSaga();

class App extends React.Component {
  static propTypes = {
    skipLoadingScreen: React.PropTypes.bool,
    assetsAreLoaded: React.PropTypes.bool,
    loadAppAssets: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.loadAppAssets();
  }

  render() {
    if (!this.props.assetsAreLoaded && !this.props.skipLoadingScreen) {
      return (<AppLoading />);
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
  };
}

const mapStateToProps = (state) => createStructuredSelector({
  assetsAreLoaded: appSelectors.selectAssetsAreLoaded(state),
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
