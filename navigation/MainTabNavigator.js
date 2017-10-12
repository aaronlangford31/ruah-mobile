import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator as tabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';
import Messages from '../app/containers/Messages';
import Catalog from '../app/containers/Catalog';
import LinksScreen from '../screens/LinksScreen';

export default tabNavigator(
  {
    Feed: {
      screen: LinksScreen,
    },
    Messages: {
      screen: Messages,
    },
    Catalog: {
      screen: Catalog,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: (config) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Messages':
            iconName = 'md-mail';
            break;
          case 'Feed':
            iconName = 'md-globe';
            break;
          case 'Catalog':
            iconName = 'md-apps';
            break;
          default:
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={config.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'Messages',
  }
);
