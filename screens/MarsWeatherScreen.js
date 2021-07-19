import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Platform } from 'react-native';

const MarsWeatherScreen = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherData, setWeatherData] = useState('');

  const getMarsData = async function () {
    try {
      const response = await fetch(
        'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json'
      );
      if (!response.ok)
        throw new Error('Could not retrieve weather data. Sever experiencing issues');

      const data = await response.json();
      const data_response = data.soles;
      const arr_weather = data_response.slice(0, 3);

      setWeatherData(arr_weather);
      setIsLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMarsData();
  }, []);

  let options = { year: 'numeric', month: 'long', day: 'numeric' };

  const content = [];

  for (let i = 0; i < weatherData.length; i++) {
    content.push(
      <View style={styles.contentContainer} key={weatherData[i].id}>
        <View style={styles.dateContainer}>
          <Text style={styles.sol}>Sol {weatherData[i].sol}</Text>
          <Text style={styles.text}>
            {Platform.OS === 'ios'
              ? new Date(weatherData[i].terrestrial_date.replace(/-/g, '/')).toLocaleString(
                  'en-US',
                  options
                )
              : new Date(weatherData[i].terrestrial_date.replace(/-/g, '/')).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.tempContainer}>
          <Text style={styles.text}>
            High: {Math.round((weatherData[i].max_temp * 9) / 5 + 32)}°F
          </Text>
          <Text style={styles.text}>
            Low: {Math.round((weatherData[i].min_temp * 9) / 5 + 32)}°F
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/mars.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        {isLoaded && content}
      </ImageBackground>
    </View>
  );
};

MarsWeatherScreen.navigationOptions = {
  headerTitle: 'Latest Weather at Gale Crater',
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    margin: '5%',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  sol: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    marginBottom: 10,
    color: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  line: {
    height: 2,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    margin: 0,
    alignSelf: 'center',
  },
});

export default MarsWeatherScreen;
