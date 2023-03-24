import BottomNavigatorScreen from './screens';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <BottomNavigatorScreen />
      </NavigationContainer>
    </>
  );
}
