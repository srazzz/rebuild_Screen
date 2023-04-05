import React, {useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import normalize from 'react-native-normalize';
import HomePage from './home/HomeScreen';
import PremiumScreen from './premium/premium_index';
import StackNavigator from './journals/stackNavigation';
import theme from './theme';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigatorScreen = () => {
  const HomePageComponent = useCallback(
    ({color}) => (
      <MaterialCommunityIcons name="home" color={color} size={normalize(26)} />
    ),
    [],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
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
            tabBarIcon: HomePageComponent,
          }}
        />
        <Tab.Screen
          name="Premium"
          component={PremiumScreen}
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
          component={StackNavigator}
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
    </SafeAreaView>
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
