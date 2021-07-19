import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as MediaLibrary from 'expo-media-library';

const AstroPictureScreen = props => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  //NEED TO IMPLEMENT ---> Custom Date Picker
  //&date=1999-05-06
  const getAstroPicture = async function () {
    try {
      const responsePicture = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=feebuh78QvnPN2fFLGivRAiDWmNcdHvtR5nD33m7'
      );
      if (!responsePicture.ok)
        throw new Error('Could not retrieve the picture of the day. Sever experiencing issues');

      const dataPicture = await responsePicture.json();

      setUrl(dataPicture.url);
      setTitle(dataPicture.title);
      setExplanation(dataPicture.explanation);
      setMediaType(dataPicture.media_type);
      setIsLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAstroPicture();
  }, []);

  const videoFormat = <WebView source={{ uri: url }} containerStyle={styles.video} />;
  const pictureFormat = (
    <View style={styles.imageContainer}>
      <Image source={{ uri: url }} style={styles.image} />
    </View>
  );

  const saveImage = async () => {
    //CURRENTLY NOT WORKING FOR ANDROID----> Need to implement MediaLibrary workaround
    const res = await MediaLibrary.saveToLibraryAsync(url);
  };

  return (
    <ScrollView>
      {isLoaded && (
        <View style={styles.wrapper}>
          {mediaType === 'video' ? videoFormat : pictureFormat}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{explanation}</Text>
          {mediaType === 'image' && Platform.OS === 'ios' && (
            <View style={styles.button}>
              <Button title="Save Image" onPress={() => saveImage()} />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

AstroPictureScreen.navigationOptions = {
  headerTitle: 'Astronomy Picture of the Day',
};

const styles = StyleSheet.create({
  video: {
    flex: 0,
    height: 300,
  },
  image: {
    height: 380,
    width: 380,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    padding: 10,
    color: 'white',
  },
  content: {
    margin: 15,
    fontFamily: 'open-sans',
    lineHeight: 40,
    color: 'white',
  },
  wrapper: {
    backgroundColor: 'black',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 35,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    padding: 10,
    width: '85%',
  },
});

export default AstroPictureScreen;
