import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import messageSelectors from '../../selectors/message';
import userSelectors from '../../selectors/user';
import { getConversations, setMessageContent, sendMessage } from '../../actions/message';
import { Avatar } from 'react-native-elements';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

class ConversationScreen extends React.Component {
  static navigationOptions = {
    title: 'Conversation',
  };

  static propTypes = {
    currConversation: PropTypes.object,
    conversationComponent: PropTypes.object,
    message: PropTypes.object,
    setMessageContent: PropTypes.func,
    sendMessage: PropTypes.func,
    store: PropTypes.object,
  }

  loading() {
    return (
      <View style={styles.loadingContainer}>
        {/* TODO: get a loading animation */}
        <Text style={styles.loadingMessage}>
          Loading...
        </Text>
      </View>
    );
  }

  list() {
    return (
      <View style={styles.container}>
        <View style={styles.messageComposeContainer}>
          <TextInput
            value={this.props.message.Content}
            returnKeyType={'send'}
            style={styles.input}
            onChangeText={(val) => this.props.setMessageContent(val)}
            onSubmitEditing={() => this.props.sendMessage()}
            placeholder={'Send a message'}
            underlineColorAndroid={Colors.foam}
          />
        </View>
        <ScrollView>
          {_.map(this.props.currConversation.Messages, (message) =>
            <View style={styles.conversationContainer} key={message.Timestamp}>
              <Avatar
                small
                rounded
                source={{
                  uri: message.Author === this.props.currConversation.RecipientId ?
                    this.props.currConversation.RecipientProfilePic : this.props.store.ProfilePicUri,
                }}
                activeOpacity={0.7}
              />
              <View style={styles.conversationContentContainer}>
                <Text>
                  {message.Author}
                </Text>
                <Text>
                  {message.Content}
                </Text>
                <Text style={{ color: Colors.ray }}>
                  {moment(message.Timestamp).fromNow()}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  emptyList() {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingMessage}>
          You {"haven't"} started any conversations yet!
        </Text>
      </View>
    );
  }

  render() {
    if (this.props.conversationComponent.awaitingLocalData) {
      return this.loading();
    } else if (!this.props.conversationComponent && !this.props.currConversation.Messages.length) {
      return this.emptyConversation();
    }
    return this.list();
  }
}

const mapStateToProps = () => createStructuredSelector({
  currConversation: messageSelectors.selectCurrConversation(),
  conversationComponent: messageSelectors.selectConversationsComponent(),
  message: messageSelectors.selectCurrMessage(),
  store: userSelectors.selectStore(),
});

function mapDispatchToProps(dispatch) {
  return {
    getConversations: () => {
      dispatch(getConversations());
    },
    setMessageContent: (val) => {
      dispatch(setMessageContent(val));
    },
    sendMessage: () => {
      dispatch(sendMessage());
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingRight: 55,
    paddingLeft: 55,
    alignItems: 'center',
  },
  loadingMessage: {
    flex: 1,
  },
  conversationContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 16,
  },
  conversationContentContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingLeft: 8,
  },
  conversationRecipientName: {
    fontWeight: 'bold',
  },
  messageComposeContainer: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  input: {
    borderColor: Colors.ray,
    backgroundColor: Colors.foam,
    borderWidth: 1,
    height: 40,
    padding: 4,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);
