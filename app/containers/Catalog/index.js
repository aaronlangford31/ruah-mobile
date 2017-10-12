import { StackNavigator as stackNavigator } from 'react-navigation';
import MainScreen from './MainScreen';

export default stackNavigator(
  {
    Main: {
      screen: MainScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  },
);
