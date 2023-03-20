import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';

const TopNavBar = () => {
  return (
    <View style={styles.topNav}>
      <TouchableOpacity>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} style={styles.location} />
          <Text style={styles.locationText}>Bangalore</Text>
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
        <MaterialIcons name="more-vert" size={25} style={styles.menuIcon} />
      </View>
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
});

export default TopNavBar;
