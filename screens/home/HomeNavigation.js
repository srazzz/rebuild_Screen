import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';
import LocationModal from './LocationModal';

//navigation bar in home screen
const TopNavBar = () => {
  const [location, setLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false); //modal that use to search locations

  return (
    <View style={styles.topNav}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} style={styles.location} />
          <Text style={styles.locationText}>
            {location || 'Select location'}
          </Text>
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
      <LocationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        location={location}
        setLocation={setLocation}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
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
  location: {
    color: theme.colors.light,
    marginRight: theme.spacing.small,
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
});

export default TopNavBar;
