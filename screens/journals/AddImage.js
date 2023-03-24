import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const AddImage = props => {
  const options = {
    noData: true,
  };
  const handleImages = response => {
    const {image, setImage, setVisible} = props;
    const newArray = [...image];
    newArray.push(response.assets[0].uri);
    console.log(newArray);
    setImage(newArray);
    setVisible(false);
  };

  const openGallery = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert('ImagePicker Error: ', response.error);
      } else {
        handleImages(response);
      }
    });
  };

  const openCamera = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert('ImagePicker Error: ', response.error);
      } else {
        handleImages(response);
      }
    });
  };
  return (
    <View style={styles.modalStyle}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          paddingTop: 0,
          marginTop: 250,
        }}>
        <TouchableOpacity onPress={() => props.setVisible(false)}>
          <Entypo name="circle-with-cross" size={22} style={styles.crossIcon} />
        </TouchableOpacity>
        <View style={styles.icons}>
          <View style={styles.type}>
            <TouchableOpacity onPress={() => openCamera()}>
              <EvilIcons name="camera" size={40} style={styles.cameraIcon} />
            </TouchableOpacity>
            <Text style={{color: 'black'}}>camera</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => openGallery()}>
              <EvilIcons name="image" size={40} style={styles.cameraIcon} />
              <Text style={{color: 'black'}}>Gallery</Text>
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
  cameraIcon: {
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
});
export default AddImage;
function handleImages(props, response) {
  props.setImagesCount(props.imagesCount + 1);
  props.setImage(props.image.push(response.assets[0].uri));
  props.setVisible(false);
}
