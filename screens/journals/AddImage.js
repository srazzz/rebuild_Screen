import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const AddImage = addedImages => {
  const options = {
    noData: true,
  };
  //sending the image response to addJournal screen
  const handleImages = response => {
    //props from  addJournal screen (parent screen)
    const {images, setImages, setVisible} = addedImages;
    //new array containing images of the journal
    const newArray = [...images];
    //pushing the resonse image uri (recently added image) to the image array
    newArray.push(response.assets[0].uri);
    setImages(newArray);
    //closing the modal after adding the image
    setVisible(false);
  };

  //when user clicked gallery option to add image
  const openGallery = () => {
    try {
      launchImageLibrary(options, response => {
        //launching the camera
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          Alert('ImagePicker Error: ', response.error);
        } else {
          handleImages(response);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  //when user clicked camera option to add image
  const openCamera = () => {
    try {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          Alert('ImagePicker Error: ', response.error);
        } else {
          handleImages(response);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.modalStyle}>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => addedImages.setVisible(false)}>
          <Entypo name="circle-with-cross" size={22} style={styles.crossIcon} />
        </TouchableOpacity>

        <View style={styles.icons}>
          <View style={styles.type}>
            <TouchableOpacity onPress={() => openCamera()}>
              <EvilIcons
                name="camera"
                size={40}
                style={styles.imageOptionIcon}
              />
            </TouchableOpacity>
            <Text style={styles.imageOptions}>camera</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => openGallery()}>
              <EvilIcons
                name="image"
                size={40}
                style={styles.imageOptionIcon}
              />
              <Text style={styles.imageOptions}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    paddingVertical: 50,
  },
  imageOptionIcon: {
    color: '#4C759A',
    backgroundColor: '#EDEADE',
    borderRadius: 25,
    padding: 5,
    marginBottom: 5,
  },
  crossIcon: {
    color: '#FA826F',
    backgroundColor: '#EDEADE',
    alignSelf: 'flex-end',
    top: 10,
    right: -10,
    borderRadius: 20,
  },
  type: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalStyle: {
    padding: 16,
    flex: 1,
    backgroundColor: '#000000aa',
  },
  options: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 0,
    marginTop: 250,
  },
  imageOptions: {
    color: 'black',
  },
});
export default AddImage;
