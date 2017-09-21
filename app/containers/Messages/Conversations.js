import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import messageSelectors from '../../selectors/message';
import { getConversations, setConversation } from '../../actions/message';
import { Avatar } from 'react-native-elements';
import { ScrollView, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import colors from '../../../constants/Colors';

class ConversationScreen extends React.Component {
  static navigationOptions = {
    title: 'Messages',
  };

  static propTypes = {
    conversations: PropTypes.array,
    conversationsComponent: PropTypes.object,
    getConversations: PropTypes.func,
    setConversation: PropTypes.func,
    navigation: PropTypes.object,
  }

  componentWillMount() {
    this.props.getConversations();
  }

  onConversationClick(channelId) {
    this.props.setConversation(channelId);
    this.props.navigation.navigate('Conversation', { channelId });
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
      <ScrollView style={styles.container}>
        {_.map(this.props.conversations, (conversation) =>
          <TouchableHighlight
            onPress={() => this.onConversationClick(conversation.ChannelId)}
            underlayColor={colors.foam}
            key={conversation.ChannelId}
          >
            <View style={styles.conversationContainer}>
              <Avatar
                small
                rounded
                source={{ uri: conversation.RecipientProfilePic }}
                activeOpacity={0.7}
              />
              <View style={styles.conversationContentContainer}>
                <Text>
                  <Text style={styles.conversationRecipientName}>{conversation.RecipientName}</Text> {conversation.RecipientId}
                </Text>
                <Text ellipsizeMode={'tail'} numberOfLines={3}>
                  {conversation.Messages[0].Content}
                </Text>
                <Text>
                  {moment(conversation.LastInteraction).fromNow()}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      </ScrollView>
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
    if (this.props.conversationsComponent.awaitingLocalData || this.props.conversationsComponent.awaitingApiData) {
      return this.loading();
    } else if (!this.props.conversationsComponent && !this.props.conversations.length) {
      return this.emptyList();
    }
    return this.list();
  }
}

const mapStateToProps = (state) => createStructuredSelector({
  conversations: messageSelectors.selectConversations(state),
  conversationsComponent: messageSelectors.selectConversationsComponent(state),
});

function mapDispatchToProps(dispatch) {
  return {
    getConversations: () => {
      dispatch(getConversations());
    },
    setConversation: (channelId) => {
      dispatch(setConversation(channelId));
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
    paddingTop: 16,
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
