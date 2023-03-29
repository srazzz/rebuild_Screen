import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder-reborn';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';

const TopNavBar = () => {
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  async function requestLocationPermission() {
    if (Platform.OS === 'ios') {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (response === 'granted') {
        console.log('Location permission granted');
      }
    } else if (Platform.OS === 'android') {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === 'granted') {
        console.log('Location permission granted');
      }
    }
  }

  useEffect(() => {
    requestLocationPermission();
    const fetchapi = async() =>{
      try{
        const res = await fetch(`https://maps.google.com/maps/api/geocode/json?key=AIzaSyC7vpG0k0WSuE3Y7dFO8f_SJ6_4ZgEJlR4&address=${encodeURI("vi")}&language=en`)
        const json = await res.json();
        console.log(json,"11111111111")
      }
      catch(err){
        console.log(err,"this isssssssssssssssssss theeeeeeeeeeeeeeeeeeeeee errrrrrrrrrroorrrrrrrrrr in nav.js")
      }

    }
    fetchapi()
  }, []);

  function openmap() {
    Geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
        console.log('Longitude: ' + longitude);
        console.log('Latitude: ' + latitude);
        var NY = {
          lat: latitude,
          // lat:13.0827,
          lng: longitude,
          // lng:80.2707
        };

        Geocoder.geocodePosition(NY)
          .then(res => {
            console.log(res)
            setLocation(res[0].locality);
          })
          .catch(err => console.log(err));
        setModalVisible(false);
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }
  function searchingCity(searchText) {
    Geocoder.geocodeAddress(searchText)
      .then(res => {
        // console.log(res[0].locality);
        console.log(res , "Responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      })
      .catch(err => console.log(err));
  }
  const clearSearch = () => {
    setSearchInput();
  };
  return (
    <View style={styles.topNav}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} style={styles.location} />
          <Text style={styles.locationText}>{location || 'Bangalore'}</Text>
          <Entypo name="chevron-down" size={20} style={styles.drop} />
        </View>
      </TouchableOpacity>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => console.log('Show notifications')}>
          <MaterialCommunityIcons
            name="bell"
            size={25}
            style={styles.notification}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('menu icon')}>
          <MaterialIcons name="more-vert" size={25} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}>
            <TouchableOpacity onPress={() => openmap()} style={styles.popup}>
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={20}
                style={styles.someicon}
              />
              <Text style={styles.modalText}>Use Current Location</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchInputContainer}>
            <MaterialIcons name="search" size={24} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search location"
              value={searchInput}
              onChangeText={text => {
                setSearchInput(text);
                searchingCity(text);
              }}
            />
            <TouchableOpacity onPress={() => clearSearch()}>
              <MaterialIcons
                name="clear"
                size={25}
                color="black"
                style={styles.clear}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notification: {
    marginRight: theme.spacing.medium,
    color: theme.colors.light,
  },
  locationText: {
    fontSize: theme.fontSizes.medium,
    paddingHorizontal: theme.spacing.small,
    color: theme.colors.light,
  },
  drop: {
    color: theme.colors.light,
    marginLeft: theme.spacing.small,
  },
  menuIcon: {
    color: theme.colors.light,
  },
  location: {
    color: theme.colors.light,
  },
  locationIcon: {
    color: theme.colors.light,
  },
  currentLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.colors.light,
    flex: 1,
    flexDirection: 'column',
    padding: theme.spacing.medium,
  },
  closeText: {
    color: theme.colors.dark,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalText: {
    color: theme.colors.dark,
    paddingHorizontal: theme.spacing.medium,
  },
  someicon: {
    color: theme.colors.dark,
  },
  popup: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.medium,
  },
  modalCont: {
    backgroundColor: 'red',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: 'black',
  },
  searchInputContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
  },
  searchIcon: {
    padding: theme.spacing.small,
    color: theme.colors.dark,
  },
  searchResult: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clear: {
    paddingHorizontal: theme.spacing.small,
  },
});

export default TopNavBar;
