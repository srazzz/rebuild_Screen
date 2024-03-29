import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; //to store key-value pair (global storage  for app)

let instructionShown = '';
//creating new key-value pair in AsyncStorage
const setShow = async value => {
  try {
    //key-pair is to check weather the scroll to view more images instruction is shown
    await AsyncStorage.setItem('show', value);
  } catch (error) {
    console.log(error);
  }
};

setShow('false'); //setting is the instruction shown to be false

//get the value of show key to check the instructions for user is shown or not
const getShow = async () => {
  try {
    const value = await AsyncStorage.getItem('show');
    instructionShown = value;
  } catch (err) {
    console.log(err);
  }
};

const JournalCards = journalsData => {
  const [showImages, setShowImages] = useState(false); //modal to display all images of that journal
  const [displayingImages, setDisplayingImages] = useState([]);
  const [showTransition, setShowTransition] = useState(false); //instruction scroll to view more should be shown or not

  //converting 24 hours time to 12 hours with AM PM
  const formatAmPm = time => {
    time = time.split(' ');
    let ampm = time[1].split(':');
    ampm = ampm[0] > 12 ? 'PM' : 'AM';
    let hours = time[1].split(':');
    let minutes = hours[1];
    hours = hours[0] > 12 ? hours[0] - 12 : hours[0];
    return time[0] + ' ' + hours + ':' + minutes + ' ' + ampm;
  };

  const [animation] = useState(new Animated.Value(0));
  const [isGoingUp, setIsGoingUp] = useState(true);

  useEffect(() => {
    //transition of scroll to view more text
    const animateView = () => {
      Animated.timing(animation, {
        toValue: isGoingUp ? -30 : 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setIsGoingUp(!isGoingUp));
    };

    animateView();
    getShow(); //getting the value from asyncStorge
  }, [animation, isGoingUp]);

  return (
    <>
      {journalsData.cardsData
        ? journalsData.cardsData.map(eachJournal => {
            return (
              <View style={styles.journal} key={eachJournal.time}>
                {eachJournal.imageSelected.length !== 0 ? (
                  <TouchableOpacity
                    onPress={() =>
                      setShowImages(true) +
                      setShowTransition(
                        instructionShown === 'true' ? false : true,
                      ) +
                      setDisplayingImages(eachJournal.imageSelected)
                    }>
                    <Image
                      source={{uri: eachJournal.imageSelected[0]}}
                      style={styles.imageStyle}
                    />

                    {eachJournal.imageSelected.length > 1 ? (
                      <View style={styles.extraImages}>
                        <Entypo name="images" size={15} color="black" />
                        <Text style={styles.imagesText}>
                          +{eachJournal.imageSelected.length - 1} images
                        </Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                ) : null}
                <View
                  style={
                    eachJournal.imageSelected.length !== 0
                      ? styles.content
                      : styles.content2
                  }>
                  <Text style={styles.title}>{eachJournal.title}</Text>
                  <Text style={styles.details}>{eachJournal.message}</Text>
                  <Text style={styles.date}>
                    {eachJournal.date}
                    {formatAmPm(eachJournal.time).toUpperCase()}
                  </Text>
                </View>

                {displayingImages.length !== 0 ? (
                  <Modal visible={showImages}>
                    <TouchableOpacity
                      onPress={() =>
                        setShowImages(false) +
                        setDisplayingImages(eachJournal.imageSelected)
                      }>
                      <Entypo
                        name="cross"
                        size={30}
                        color="red"
                        style={styles.crossIcon}
                      />
                    </TouchableOpacity>
                    <ScrollView style={styles.scrollStyle}>
                      {displayingImages.map((each, index) => {
                        return (
                          <Image
                            key={(index = index + 1)}
                            source={{
                              uri: each,
                            }}
                            style={styles.scrollImage}
                          />
                        );
                      })}
                    </ScrollView>
                    {showTransition ? (
                      <TouchableOpacity
                        onPress={() =>
                          setShowTransition(false) + setShow('true')
                        }
                        style={styles.mask}>
                        <Animated.View
                          style={[
                            styles.animatedViewStyle,
                            {transform: [{translateY: animation}]},
                          ]}>
                          <Text style={styles.transitionText}>
                            Scroll to view more
                          </Text>
                          <MaterialCommunityIcons
                            name="chevron-double-down"
                            size={30}
                            color="white"
                          />
                        </Animated.View>
                      </TouchableOpacity>
                    ) : null}
                  </Modal>
                ) : null}
              </View>
            );
          })
        : null}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '65%',
  },
  content2: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: 'black',
  },
  details: {
    color: '#999999',
    fontSize: 14,
    lineHeight: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },

  journal: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    marginBottom: 5,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  date: {
    alignSelf: 'flex-end',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  extraImages: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 5,
    marginRight: 10,
  },
  crossIcon: {
    margin: 5,
    marginBottom: 0,
    alignSelf: 'flex-end',
  },
  scrollImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 15,
  },
  scrollStyle: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  mask: {
    backgroundColor: '#000000aa',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    top: 0,
    width: '100%',
  },
  transitionText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  imagesText: {color: '#FA826F', marginLeft: 5},
  animatedViewStyle: {
    alignItems: 'center',
  },
});
export default JournalCards;
