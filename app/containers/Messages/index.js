import React from 'react';
import { StackNavigator as stackNavigator } from 'react-navigation';
import Conversations from './Conversations';
import Conversation from './Conversation';

const MessageNavigator = stackNavigator(
  {
    Main: {
      screen: Conversations,
    },
    Conversation: {
      screen: Conversation,
      path: 'conversation/:channelId',
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class MessageComponent extends React.Component {
  render() {
    return <MessageNavigator />;
  }
}
