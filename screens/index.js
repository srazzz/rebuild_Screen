import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import normalize from 'react-native-normalize';
import Duplicate from './duplicate';
import ProfileScreen from './premium/premium_index';
import theme from './theme';

import HomePage from './taskbox';
const Tab = createMaterialBottomTabNavigator();

const BottomNavigatorScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={theme.colors.primary}
      inactiveColor="#000"
      barStyle={styles.barStyle}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={normalize(26)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Premium"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Premium',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="star"
              color={color}
              size={normalize(26)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Duplicate}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={normalize(26)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#fff',
    borderColor: '#000',
    paddingVertical: normalize(10),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    position: 'absolute',
    overflow: 'hidden',
  },
});

export default BottomNavigatorScreen;
