import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import userSelectors from '../app/selectors/user';
import { userSubmitLogin, setUserId, setPassword } from '../app/actions/user';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RuahLogo from '../assets/images/logo.png';
import Colors from '../constants/Colors';


class LoginScreen extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    loginComponent: PropTypes.object,
    userSubmitLogin: PropTypes.func,
    setUserId: PropTypes.func,
    setPassword: PropTypes.func,
  }

  render() {
    if (this.props.loginComponent.awaitingLoginResponse) {
      return (
        <View style={styles.container}>
          <Image source={RuahLogo} style={styles.ruahLogoLoading} resizeMode={'contain'} />
          <Text style={styles.loadingMessage}>
            Authenticating...
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Image source={RuahLogo} style={styles.ruahLogo} resizeMode={'contain'} />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Username
          </Text>
          <TextInput
            value={this.props.user.userId}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            style={styles.input}
            onChangeText={(val) => this.props.setUserId(val)}
            onSubmitEditing={() => { this.PasswordInput.focus(); }}
            placeholder={'email@example.com'}
            underlineColorAndroid={Colors.foam}
          />
          <Text style={styles.inputLabel}>
            Password
          </Text>
          <TextInput
            ref={(el) => { this.PasswordInput = el; }}
            value={this.props.user.password}
            autoCorrect={false}
            autoCapitalize={'none'}
            secureTextEntry
            onChangeText={(val) => this.props.setPassword(val)}
            onSubmitEditing={() => { this.props.userSubmitLogin(); }}
            style={styles.input}
            placeholder={'password'}
            returnKeyType={'go'}
            underlineColorAndroid={Colors.foam}
          />
          {this.props.loginComponent.shouldDisplayError &&
            <Text style={styles.inputError}>
              {this.props.loginComponent.error}
            </Text>
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => createStructuredSelector({
  user: userSelectors.selectUser(state),
  loginComponent: userSelectors.selectLoginComponent(state),
});

function mapDispatchToProps(dispatch) {
  return {
    userSubmitLogin: () => {
      dispatch(userSubmitLogin());
    },
    setUserId: (val) => {
      dispatch(setUserId(val));
    },
    setPassword: (val) => {
      dispatch(setPassword(val));
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingRight: 55,
    paddingLeft: 55,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
    width: '100%',
  },
  inputLabel: {
    color: Colors.ray,
  },
  input: {
    borderColor: Colors.ray,
    backgroundColor: Colors.foam,
    borderWidth: 1,
    height: 40,
    padding: 4,
    marginBottom: 16,
  },
  inputError: {
    color: Colors.magma,
  },
  ruahLogo: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
  ruahLogoLoading: {
    flex: 4,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
  loadingMessage: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
