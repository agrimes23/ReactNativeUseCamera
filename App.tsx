import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image
} from 'react-native';
import ImagePicker, { launchCamera, CameraOptions, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import HomeScreen from './src/screens/HomeScreen';

// Resources used:
// // https://github.com/react-native-image-picker/react-native-image-picker#the-response-object
// //  

function App(): JSX.Element {

  

  return (
    <SafeAreaView>
      <ScrollView>
      
      <HomeScreen />

      </ScrollView>
    </SafeAreaView>
  );
}



export default App;