import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const PeopleInSpaceScreen = props => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [numPeople, setNumPeople] = useState('');
  const [peopleData, setPeopleData] = useState('');

  const getPeopleData = async function () {
    try {
      const response = await fetch('http://api.open-notify.org/astros.json');
      if (!response.ok) throw new Error('Could not retrieve data. Sever experiencing issues');

      const data = await response.json();
      const data_response = data.people;
      const data_final_number = data.number;

      setPeopleData(data_response);
      setNumPeople(data_final_number);
      setIsLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  const content = [];

  for (let i = 0; i < peopleData.length; i++) {
    content.push(
      <View key={peopleData[i].name} style={styles.listItem}>
        <Text style={styles.text}>
          #{[i + 1]} {peopleData[i].name}
        </Text>
        <Text style={styles.text}>Craft: {peopleData[i].craft}</Text>
      </View>
    );
  }

  useEffect(() => {
    getPeopleData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <ImageBackground
        source={require('../assets/space2.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        {isLoaded && (
          <View style={styles.contentContainer}>
            <Text style={styles.total}>Current Total: {numPeople}</Text>
            {content}
          </View>
        )}
      </ImageBackground>
    </ScrollView>
  );
};

PeopleInSpaceScreen.navigationOptions = {
  headerTitle: 'People in Space Right Now',
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    width: '85%',
    marginBottom: 25,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    borderWidth: 1,
    height: 90,
    padding: 15,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: 'rgba(95, 117, 165, 0.75)',
  },
  total: {
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    textDecorationLine: 'underline',
    color: 'white',
  },
  text: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: 'white',
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PeopleInSpaceScreen;
