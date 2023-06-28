import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal
} from 'react-native';
import ImagePicker, { launchCamera, CameraOptions, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';

// documentation used: https://github.com/react-native-image-picker/react-native-image-picker

// TODO: 
// // Make elements ADA accessible, using accessible={true}, accessibilityLabel={label}, accessibilityTraits={"button"} <- Touchable Opacity, accessibilityRole={"image"}, label on buttons
// // Upgrade css stylesheet to NativeWind CSS

const HomeScreen = () => {

  // for front and back camera image feature:
  const [frontImage, setFrontImage] = useState<string | undefined>(undefined);
  const [backImage, setBackImage] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [cardSide, setCardSide] = useState<string>("")

  // take a picture using phone's camera
    const openCamera = async () => {
      try {
        const options: CameraOptions = {
          mediaType: 'photo',
          includeBase64: false, // might need to set it to true to save image to backend?
          saveToPhotos: true, // only saves photos to user's phone gallery
        };
        setOpenModal(false)
        const result = await launchCamera(options);
        console.log(result)
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

        setOpenModal(false)
        const result = await launchImageLibrary(options)
        console.log(result)
        if (result.assets && result.assets.length > 0 && cardSide === "front") {
          setFrontImage(result.assets[0].uri)
        } else if(result.assets && result.assets.length > 0 && cardSide === "back") {
          setBackImage(result.assets[0].uri)
        }

      }  catch (error) {
        console.log('Error in selecting image from album:', error);
      }
      
    }

    // click either button to add an image. This will prompt the user to choose openCamera() and getImageFromLibrary() via modal
    const addImage = (cardSide: string) => {
      setOpenModal(true)
      setCardSide(cardSide)
    }

    return (
        <View>
            <View style={styles.view}>
              <Text className="flex text-3xl text-black m-5" accessibilityRole="header" accessibilityLabel="Title: Vaccination Card Page. You can add vaccination card from your phone's photo gallery, or take a picture with your camera and submit" >Vaccination Card Page</Text>           
            </View>

            {/* click to take pic of front & back */}
            {/* front of card */}
            <View style={styles.view}>
              <Text className="flex text-2xl text-black m-3" accessibilityLabel="Front" accessibilityRole="header">Front</Text>
              {frontImage ? (<Image style={styles.image} source={{ uri: frontImage }} accessible={true} accessibilityLabel="Front of vaccination card" accessibilityRole="image" />) : (<Image style={styles.image} source={require('../../assets/nopicture.png')} accessible={true} accessibilityLabel="Blank Image" accessibilityRole="image" />)}
              <TouchableOpacity style={styles.button} onPress={() => addImage("front")} accessible={true} accessibilityLabel="Add Front of Vaccination Card Image" accessibilityRole="button">
                <Text style={styles.buttonText}>Add Front of Card Image</Text>
              </TouchableOpacity>
            </View>
            

            {/* back of card*/}
            <View style={styles.view}>
              <Text className="flex text-2xl text-black m-3" accessibilityRole="header" accessibilityLabel="Back">Back</Text>
              {backImage ? (<Image style={styles.image} source={{ uri: backImage }} accessible={true} accessibilityLabel="Back of vaccination card" accessibilityRole="image" />) : (<Image style={styles.image} source={require('../../assets/nopicture.png')} accessible={true} accessibilityLabel="Blank Image" accessibilityRole="image" />)}
              <TouchableOpacity style={styles.button} onPress={() => addImage("back")} accessible={true} accessibilityLabel="Add Back of Vaccination Card Image" accessibilityRole="button">
                <Text style={styles.buttonText}>Add Back of Card Image</Text>
              </TouchableOpacity>
            </View>
            
            {/* modal pop-up */}
            <Modal visible={openModal} transparent >
              <View style={styles.bgModalOne}></View>
            </Modal>
            <Modal visible={openModal} style={styles.modalProp} transparent animationType="slide" accessibilityLabel="Bottom of Screen Pop Up: Choose How you want to Upload Photo" accessibilityRole="menu">
              <View style={styles.bgModalTwo}>
                <TouchableOpacity onPress={() => openCamera()} accessible={true} accessibilityLabel="Use Camera" accessibilityRole="menuitem">
                  <Text style={styles.modalText}>Use Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getImageFromLibrary()} accessible={true} accessibilityLabel="Select Image from Phone Album" accessibilityRole="menuitem">
                  <Text style={styles.modalText}>Select Image from Phone Album</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenModal(false)} accessible={true} accessibilityLabel="Back to Vaccination Card Page" accessibilityRole="menuitem">
                  <Text style={styles.modalText}>Back</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            
        </View>

    )
}

const styles = StyleSheet.create(
  {
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#82faf6',
      padding: 10,
      borderColor: "#000000",
      borderWidth: 1,
      marginTop: 10,
      width: 300,
      borderRadius: 4
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
      color: '#000000',
    },
    buttonText: {
      color: '#000000',
      textAlign: 'center',
      fontSize: 20,
      paddingTop: 5,
      paddingBottom: 5,
    },
    hidden: {
      display: 'none'
    },
    show: {
      display: 'flex',
      zIndex: 2,
      margin: 'auto',
      width: 300,
      height: 300,
    },
    modalText: {
      marginTop: 15,
      fontSize: 20,
      textAlign: 'center',
      color: '#000000',
    },
    bgModalOne: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalProp: {
      display: 'flex',
      flexDirection: 'row',
      height: "100%",
      justifyContent: 'flex-end',
    },
    bgModalTwo: {
      display: 'flex',
      position: 'absolute',
      bottom: 0,
      paddingTop: 40,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: '30%',
      width: '100%',
      backgroundColor: 'rgba(255,255,255, 1)'
    }

  });

export default HomeScreen;