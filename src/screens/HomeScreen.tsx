import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import ImagePicker, { launchCamera, CameraOptions, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';

// documentation used: https://github.com/react-native-image-picker/react-native-image-picker

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
          includeBase64: false, // might need to set it to true to save image to backend? Multer Middleware seems to be popular for ppl who use rn-image-picker
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
            <View className="w-screen items-center">
              <Text className="text-3xl text-black m-5" accessibilityRole="header" accessibilityLabel="Title: Vaccination Card Page. Add vaccination card from your phone's photo gallery, or take a picture with your camera and submit" >Insurance Card Page</Text>           
            </View>

            {/* click to take pic of front & back */}
            {/* front of card section */}
            <View className="w-screen items-center">
              <Text className="text-2xl text-black m-3" accessibilityLabel="Front" accessibilityRole="header">Front</Text>
              {
                frontImage ? (
                  <Image className="mt-2 mx-1 justify-center w-72 h-52" source={{ uri: frontImage }} accessible={true} accessibilityLabel="Front of vaccination card" accessibilityRole="image" />
                ) : (
                  <Image className="mt-2 mx-1 justify-center w-72 h-52" source={require('../../assets/nopicture.png')} accessible={true} accessibilityLabel="Blank Image" accessibilityRole="image" />
                )
              }
              <TouchableOpacity className="items-center bg-green-300 p-3 border border-black mt-2 w-72 rounded" onPress={() => addImage("front")} accessible={true} accessibilityLabel="Add Front of Vaccination Card Image" accessibilityRole="button">
                <Text className="text-center text-xl text-black py-1">Add Front of Card Image</Text>
              </TouchableOpacity>
            </View>
            

            {/* back of card section */}
            <View className="w-screen items-center">
              <Text className="text-2xl text-black m-3" accessibilityRole="header" accessibilityLabel="Back">Back</Text>
              {
                backImage ? 
                (<Image className="mt-2 mx-1 justify-center w-72 h-52" source={{ uri: backImage }} accessible={true} accessibilityLabel="Back of vaccination card" accessibilityRole="image" />
                ) : 
                (<Image className="mt-2 mx-1 justify-center w-72 h-52" source={require('../../assets/nopicture.png')} accessible={true} accessibilityLabel="Blank Image" accessibilityRole="image" />
                )
              }
              <TouchableOpacity className="items-center bg-green-300 p-3 border border-black mt-2 w-72 rounded" onPress={() => addImage("back")} accessible={true} accessibilityLabel="Add Back of Vaccination Card Image" accessibilityRole="button">
                <Text className="text-center text-xl text-black py-1">Add Back of Card Image</Text>
              </TouchableOpacity>
            </View>
            
            {/* modal pop-up */}
            <Modal visible={openModal} transparent >
              <View className="h-screen w-screen bg-opacity-90 bg-black opacity-70"></View>
            </Modal>
            <Modal visible={openModal} className="h-screen justify-end" transparent animationType="slide" accessibilityLabel="Bottom of Screen Pop Up: Choose How you want to Upload Photo" accessibilityRole="menu">
              <View className="absolute bottom-0 pt-10 rounded-t h-56 w-screen bg-white">
                <TouchableOpacity onPress={() => openCamera()} accessible={true} accessibilityLabel="Use Camera" accessibilityRole="menuitem">
                  <Text className="mt-3 text-xl text-center text-black">Use Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getImageFromLibrary()} accessible={true} accessibilityLabel="Select Image from Phone Album" accessibilityRole="menuitem">
                  <Text className="mt-3 text-xl text-center text-black">Select Image from Phone Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenModal(false)} accessible={true} accessibilityLabel="Back to Vaccination Card Page" accessibilityRole="menuitem">
                  <Text className="mt-3 text-xl text-center text-red-500">Back</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            
        </View>

    )
}

export default HomeScreen;