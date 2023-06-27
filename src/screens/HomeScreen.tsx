import React, {useEffect, useState} from 'react';
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

// documentation used: https://github.com/react-native-image-picker/react-native-image-picker
// TODO:
// // How to show front and back photos at the same time
// // // Maybe use an array of 2 objects? I think there's a special array/list that limits the amount of elements
// // // 

const HomeScreen = () => {

  const [imageFile, setImageFile] = useState<string | undefined>(undefined);

  // for front and back feature:
  const [frontImage, setFrontImage] = useState<string | undefined>(undefined);
  const [backImage, setBackImage] = useState<string | undefined>(undefined);


  // take a picture using phone's camera
    const openCamera = async (cardSide: string) => {
      try {
        const options: CameraOptions = {
          mediaType: 'photo',
          includeBase64: false, // might need to set it to true to save image to backend?
        };
        
        const result = await launchCamera(options);

        if (result.assets && result.assets.length > 0 && cardSide === "front") {
          setFrontImage(result.assets[0].uri)
        } else if(result.assets && result.assets.length > 0 && cardSide === "back") {
          setBackImage(result.assets[0].uri)
        }
        
      } catch (error) {
        console.log('Error opening camera:', error);
      }
    };
  
    // choose image from phone's photo gallery
    const getImageFromLibrary = async () => {
      try {
  
        const options: ImageLibraryOptions = {
          mediaType: 'photo',
          includeBase64: false,
        }
        
        const result = await launchImageLibrary(options)
        if (result.assets && result.assets.length > 0) {
          setImageFile(result.assets[0].uri)
        }

  
      }  catch (error) {
        console.log('Error in selecting image from album:', error);
      }
    }

    return (
        <View>
            <View style={styles.view}>
              <Text style={styles.text}>Vaccination Card Page</Text>
            {/* if wanted to get image from album */}
            {/* <TouchableOpacity style={styles.button} onPress={getImageFromLibrary}>
                <Text>Get Image from Album</Text>
            </TouchableOpacity> */}
            
            </View>

            {/* most likely scenario: click to take pic of front & back */}
            {/* front */}
            <View style={styles.view}>
              <Text style={styles.text}>Front</Text>
              {frontImage ? (<Image style={styles.image} source={{ uri: frontImage }} />) : (<Image style={styles.image} source={require('../assets/nopicture.png')} />)}
              <TouchableOpacity style={styles.button} onPress={() => openCamera("front")}>
                <Text>Add Front of Card Image</Text>
              </TouchableOpacity>
            </View>
            

            {/* back */}
            <View style={styles.view}>
              <Text style={styles.text}>Back</Text>
              {backImage ? (<Image style={styles.image} source={{ uri: backImage }} />) : (<Image style={styles.image} source={require('../assets/nopicture.png')} />)}
              <TouchableOpacity style={styles.button} onPress={() => openCamera("back")}>
                <Text>Add Back of Card Image</Text>
              </TouchableOpacity>
            </View>
            
        </View>

    )
}

const styles = StyleSheet.create({
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#5bc7aa',
      padding: 10,
      borderColor: "#000000",
      borderWidth: 1,
      marginTop: 10,
      width: 300,
    },
    view: {
      display: 'flex',
      flexDirection: 'column',
      width: 'auto', 
      alignItems: 'center'
    },
    image: {
      display: 'flex',
      marginTop: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      justifyContent: 'center',
      width: 300,
      height: 200,
    },
    text: {
      display: 'flex',
      fontSize: 30,
      textAlign: 'center',
      marginTop: 25,
    }
  });

export default HomeScreen;