import React from 'react';
<<<<<<< HEAD
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
=======
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
>>>>>>> 445a40ee1b69e549b25f51f671e8a8d431df7db5
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import normalize from 'react-native-normalize';
import theme from '../theme';
<<<<<<< HEAD

//Subscription Banner  
=======
>>>>>>> 445a40ee1b69e549b25f51f671e8a8d431df7db5

//Subscription Banner
const Gradient = () => {
  return (
    <LinearGradient
      colors={['#4C759A', '#886BCB']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.mainContainer}>
      <View style={styles.mainView}>
        <View style={styles.content}>
          <MaterialCommunityIcons
            name="video-vintage"
            size={26}
            color="#FFF"
            style={styles.videoIcon}
          />
          <Text style={styles.contentText}>
            Live classes @INR 249/month.Join Live Yoga & Medication classes
            everyday.
          </Text>
        </View>
        <TouchableOpacity style={styles.subscribe}>
          <MaterialCommunityIcons
            name="lock-open-outline"
            size={20}
            color="black"
            style={styles.lockIcon}
          />
          <Text style={styles.subscribeText}>Subscribe to Premium</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: theme.spacing.medium,
    borderRadius: 8,
    flexDirection: 'column',
    marginHorizontal: theme.spacing.medium,
  },
  mainView: {
    padding: theme.spacing.medium,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: theme.spacing.large,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoIcon: {
    marginRight: theme.spacing.small,
  },
  contentText: {
    fontFamily: 'SF Pro Display',
    fontSize: theme.fontSizes.normal,
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.light,
    lineHeight: normalize(24),
    flexShrink: 1,
  },
  sub: {
    flexDirection: 'row',
  },
  subscribe: {
    backgroundColor: theme.colors.light,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  lockIcon: {},
  subscribeText: {
    marginLeft: theme.spacing.small,
    color: theme.colors.dark,
    fontSize: theme.fontSizes.medium,
    fontWeight: theme.fontWeight.semiBold,
  },
});
export default Gradient;
