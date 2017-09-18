import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import messageSelectors from '../../selectors/message';
import { getConversations } from '../../actions/message';
import { Avatar } from 'react-native-elements';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

class ConversationScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  static propTypes = {
    messages: PropTypes.array,
    conversationComponent: PropTypes.object,
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
        <ScrollView>
          {_.map(this.props.messages, (message) =>
            <View style={styles.conversationContainer} key={message.Timestamp}>
              <Avatar
                small
                rounded
                source={{ uri: 'https://reactnavigation.org/assets/react-nav-logo.svg' }}
                activeOpacity={0.7}
              />
              <View style={styles.conversationContentContainer}>
                <Text>
                  {message.Author}
                </Text>
                <Text>
                  {message.Content}
                </Text>
                <Text>
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
    } else if (!this.props.conversationComponent && !this.props.messages.length) {
      return this.emptyConversation();
    }
    return this.list();
  }
}

const mapStateToProps = (state) => createStructuredSelector({
  messages: messageSelectors.selectConversation(state),
  conversationComponent: messageSelectors.selectConversationComponent(state),
});

function mapDispatchToProps(dispatch) {
  return {
    getConversations: () => {
      dispatch(getConversations());
    },
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationScreen);
