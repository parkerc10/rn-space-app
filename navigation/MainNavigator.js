import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import OverviewScreen from '../screens/OverviewScreen';
import AstroPictureScreen from '../screens/AstroPictureScreen';
import MarsWeatherScreen from '../screens/MarsWeatherScreen';
import PeopleInSpaceScreen from '../screens/PeopleInSpaceScreen';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
    color: 'white',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: 'white',
};

const MainNavigator = createStackNavigator(
  {
    Overview: OverviewScreen,
    AstroPicture: AstroPictureScreen,
    MarsWeather: MarsWeatherScreen,
    PeopleInSpace: PeopleInSpaceScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

export default createAppContainer(MainNavigator);
