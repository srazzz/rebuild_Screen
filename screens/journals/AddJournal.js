import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  DeviceEventEmitter,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AddImage from './AddImage';

const AddJournal = ({route, navigation: {goBack}}) => {
  //params from journalCards
  const {cardsData} = route.params;
  const [visible, setVisible] = useState(false); //to decalre the visibility of AddImage modal
  //details to be filled to add new journal
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);

  // taking current date, time from Date() function and converting into desirable format
  let date = new Date().toDateString().split(' '); //[day ,month ,date, year]
  let time = new Date().toTimeString().split(' '); //[hours:minutes:seconds , GMT+0000 , (Coordinated', 'Universal', 'Time)]
  time = date[0] + ' ' + time[0].split(':')[0] + ':' + time[0].split(':')[1]; //day hours:minutes
  date = date[2] + ' ' + date[1] + ' ' + date[3] + ' '; //date month year
  const dateTime = time + ', ' + date;

  //on Submmit
  const handleSubmit = () => {
    //validation
    if (title === '') {
      Alert.alert('Error', 'enter title field');
    } else if (message === '') {
      Alert.alert('Error', 'enter message');
    } else {
      //new journal format
      const newJournal = {
        title: title,
        message: message,
        time: time,
        date: date,
        imageSelected: images,
      };
      console.log(newJournal);
      // setUpdate(!update); //to refresh the page
      cardsData.push(newJournal); //adding new journal to cardsData
      // setCardsData(cardsData);
      DeviceEventEmitter.emit('refresh', cardsData);

      goBack();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Enter Details..</Text>
        <Text style={styles.labels}>Title:</Text>
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          placeholderTextColor="black"
        />
        <Text style={styles.labels}>Message:</Text>
        <TextInput
          style={styles.title}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter message"
          placeholderTextColor="black"
          multiline={true}
        />
        <Text style={styles.labels}>Date:</Text>
        <TextInput
          style={styles.title}
          editable={false}
          selectTextOnFocus={false}
          placeholder="Enter Date time"
          placeholderTextColor="black"
          value={dateTime}
        />

        <View style={styles.extraImagesText}>
          <Text style={styles.labels}>Images ({images.length})</Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Text style={styles.addImage}>Add</Text>
          </TouchableOpacity>
        </View>

        {images.length !== 0
          ? images.map(imageUrl => (
              <View style={styles.eachImage} key={imageUrl}>
                <TouchableOpacity>
                  <EvilIcons name="image" size={30} style={styles.cameraIcon} />
                </TouchableOpacity>
                <Text
                  style={styles.imageURL}
                  numberOfLines={1}
                  ellipsizeMode="middle">
                  {imageUrl}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    const newImages = images.filter(img => img !== imageUrl);
                    setImages(newImages);
                  }}>
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={22}
                    style={styles.crossIcon}
                  />
                </TouchableOpacity>
              </View>
            ))
          : null}
      </ScrollView>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.closeButton} onPress={() => goBack()}>
          <Text style={styles.closeButtonText}>CLOSE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleSubmit()}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={visible} transparent={true}>
        <AddImage
          setVisible={setVisible}
          setImages={setImages}
          images={images}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    color: 'black',
    borderWidth: 0.5,
    borderColor: 'grey',
    paddingHorizontal: 10,
  },
  heading: {
    alignSelf: 'center',
    fontWeight: 300,
    fontSize: 24,
    marginBottom: 30,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#4C759A',
    height: 50,
    width: 100,
    borderRadius: 12,
    justifyContent: 'center',
  },
  addButtonText: {alignSelf: 'center', color: 'white', fontSize: 16},
  closeButton: {
    borderColor: '#F9826D',
    borderWidth: 2,
    width: 100,
    height: 50,
    justifyContent: 'center',
    borderRadius: 12,
  },
  closeButtonText: {alignSelf: 'center', color: '#F9826D', fontSize: 16},
  labels: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 80,
  },
  imagePicked: {
    width: '100%',
    height: 150,
    backgroundColor: '#F9F6EE',
    alignSelf: 'center',
  },
  cameraIcon: {
    color: '#4C759A',
    borderRadius: 12,
    padding: 5,
  },
  crossIcon: {
    color: '#4C759A',
  },
  eachImage: {
    backgroundColor: '#EDEADE',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  imageURL: {color: 'black', flexShrink: 10},
  addImage: {
    borderColor: '#4C759A',
    color: '#4C759A',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  extraImagesText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default AddJournal;
