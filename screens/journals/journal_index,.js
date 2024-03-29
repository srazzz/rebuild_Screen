import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  DeviceEventEmitter,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';
import JournalCards from './JournalCards'; //displaying cards in journals page

const JournalPage = ({navigation}) => {
  const [cardsData, setCardsData] = useState([
    {
      date: '21 Mar 2023',
      time: 'Tue 9:25',
      imageSelected: [
        'file:///data/user/0/com.rebuild_screen/cache/rn_image_picker_lib_temp_f2bd744e-db8f-497c-99fe-545b32f1b0a7.jpg',
        'file:///data/user/0/com.rebuild_screen/cache/rn_image_picker_lib_temp_f2bd744e-db8f-497c-99fe-545b32f1b0a7.jpg',
        'file:///data/user/0/com.rebuild_screen/cache/rn_image_picker_lib_temp_f2bd744e-db8f-497c-99fe-545b32f1b0a7.jpg',
      ],

      message:
        'Hey there Contact in I3-G50 room in case of any SMS related problem.Contact in I3-G50 room in case of any SMS related problem. CITADEL. Copyright © 2015-2018 RGUKT Nuzvid. All rights reserved.',
      title: 'Two',
    },
    {
      date: '21 Mar 2023',
      time: 'Tue 15:28',
      imageSelected: [],
      message:
        'Hey there Contact in I3-G50 room in case of any SMS related problem. CITADEL. Copyright © 2015-2018 RGUKT Nuzvid. All rights reserved.',
      title: 'One',
    },
  ]);
  useEffect(() => {
    //this is to avoid error : non serializable values were found in the navigation state
    // refresh is the event name, we call this in signUp screen to refresh this page after signUp
    DeviceEventEmitter.addListener('refresh', data => {
      setCardsData(data);
    });
    return () => DeviceEventEmitter.removeAllListeners();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.navbarStyle}>
        <Text style={styles.heading}>Journals</Text>
        <View style={styles.NavIcons}>
          <Ionicons name="search" size={20} style={styles.searchIcon} />
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color="black"
          />
        </View>
      </View>
      <ScrollView style={styles.scrollStyle}>
        <JournalCards cardsData={cardsData} />
      </ScrollView>

      <TouchableOpacity
        style={styles.FloatingButton}
        onPress={() =>
          navigation.navigate('addJournal', {
            cardsData: cardsData,
          })
        }>
        <Ionicons name="add" size={25} style={styles.addIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  navbarStyle: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
    borderBottomColor: theme.colors.dark,
    borderBottomWidth: 1,
  },
  NavIcons: {flexDirection: 'row'},
  searchIcon: {
    marginRight: 10,
    color: 'black',
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 500,
  },
  FloatingButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: 115,
    right: 20,
    alignItems: 'center',
  },
  addIcon: {
    color: 'white',
    top: 10,
  },
  add: {
    backgroundColor: theme.colors.secondary,
  },
  scrollStyle: {
    backgroundColor: '#F9F6EE',
    marginBottom: 100,
  },
});
export default JournalPage;
