import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoder-reborn';
import Geolocation from 'react-native-geolocation-service';
import {Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';

const LocationModal = ({
  modalVisible,
  setModalVisible,
  location,
  setLocation,
}) => {
  const [searchInput, setSearchInput] = useState('');

  // console.log('mounted lmodal');

  //To add location permission
  async function requestLocationPermission() {
    try {
      if (
        Platform.OS === 'ios' ||
        (await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)) === 'granted'
      ) {
        return true;
      }
      return false;
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  });

  function openmap() {
    //To get device current location
    Geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
        let latLng = {
          lat: latitude,
          // lat:13.0827,
          lng: longitude,
          // lng:80.2707
        };

        //To get location details given in the searchbox
        Geocoder.geocodePosition(latLng)
          .then(res => {
            setLocation(res[0].locality);
            console.log(res[0].locality);
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
        console.log(res);
      })
      .catch(err => console.log(err));
  }
  const clearSearch = () => {
    setSearchInput();
  };

  return (
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
        <View style={styles.locationline}>
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
  );
};

const styles = StyleSheet.create({
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
  locationline: {
    borderBottomColor: theme.colors.dark,
    borderBottomWidth: 1,
  },
});

export default LocationModal;
