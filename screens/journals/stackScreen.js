import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddJournal from './AddJournal';
import JournalPage from './journal_index,';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfilePage"
          options={{headerShown: false}}
          component={JournalPage}
        />
        <Stack.Screen
          name="addJournal"
          options={{headerShown: false}}
          component={AddJournal}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
