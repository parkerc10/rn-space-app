import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import ScreenListItem from '../components/ScreenListItem';

const OverviewScreen = props => {
  const selectFormHandler = destination => {
    props.navigation.navigate(destination);
  };

  return (
    <ImageBackground
      source={require('../assets/space.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        <ScreenListItem
          onSelect={() => {
            selectFormHandler('AstroPicture');
          }}
        >
          Astronomy Picture of the Day
        </ScreenListItem>
        <ScreenListItem
          onSelect={() => {
            selectFormHandler('MarsWeather');
          }}
        >
          Mars Weather Service:{'\n'}
          Courtesy of the Curiosity Rover
        </ScreenListItem>
        <ScreenListItem
          onSelect={() => {
            selectFormHandler('PeopleInSpace');
          }}
        >
          People in Space Right Now
        </ScreenListItem>
      </View>
    </ImageBackground>
  );
};

OverviewScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

export default OverviewScreen;
