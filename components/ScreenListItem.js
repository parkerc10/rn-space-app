import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ScreenListItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.list}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 140,
    margin: 20,
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'yellow',
  },
});

export default ScreenListItem;
