import BottomNavigatorScreen from './screens';
import ProfileScreen from './screens/premium/premium_index';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavigatorScreen />
    </NavigationContainer>
  );
}
