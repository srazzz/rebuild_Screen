import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import normalize from 'react-native-normalize';

import BenifitsPremium from './BenifitsList';
import Premium from './PakageCards';
import Suggestions from './Suggestion';
import theme from '../theme';

function PremiumScreen() {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[theme.colors.tertiary, theme.colors.secondary]}
      style={styles.gradient}>
      <>
        <View style={styles.navbarStyle}>
          <Icon name="arrow-back-ios" size={20} style={styles.backIcon} />

          <Text style={styles.textInNav}>Premium</Text>

          <View style={styles.NavIcons}>
            <View>
              <Ionicons
                name="notifications"
                size={20}
                style={styles.notiificationIcon}
              />
            </View>
            <View>
              <SimpleLineIcons
                name="options-vertical"
                size={20}
                style={styles.optionsIcon}
              />
            </View>
          </View>
        </View>

        <View style={styles.scrollViewStyle}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <BenifitsPremium />
            <Premium />
            <Suggestions />
          </ScrollView>
        </View>
      </>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    flex: 1,
  },
  navbarStyle: {
    backgroundColor: theme.colors.tertiary,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.medium,
  },
  textInNav: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontSize: normalize(theme.fontSizes.large),
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.light,
    position: 'absolute',
    marginLeft: '45%', //doubt
  },
  backIcon: {color: theme.colors.light},
  NavIcons: {flexDirection: 'row', justifyContent: 'space-between'},
  notiificationIcon: {
    color: theme.colors.light,
    marginRight: theme.spacing.medium,
  },
  optionsIcon: {color: theme.colors.light},
  scrollViewStyle: {
    flex: 1,
    paddingHorizontal: theme.spacing.medium,
    marginBottom: 90, //to display entire screen botom tab nav error
  },
});

export default PremiumScreen;
