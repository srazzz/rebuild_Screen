import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../theme';

const BoxWithGradientAndButton = () => {
  return (
    <LinearGradient
      colors={['#4C759A', '#886BCB']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.mainContainer}>
      <View style={styles.subcontainer}>
        <View style={styles.top}>
          <MaterialCommunityIcons
            name="video-vintage"
            size={25}
            color="#FFF"></MaterialCommunityIcons>
          <Text style={styles.firstText}>
            Live classes @INR 249/month.Join Live Yoga & Medication classes
            everyday.
          </Text>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.box}>
            <MaterialCommunityIcons
              name="lock-open-outline"
              size={20}
              color="black"
            />
            <Text style={styles.secondText}>Subscribe to Premium</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 8,
    height: 175,
    marginBottom: theme.spacing.medium,
  },
  subcontainer: {
    margin: theme.spacing.medium,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // backgroundColor: 'red'
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstText: {
    color: '#FFF',
    fontSize: theme.fontSizes.small,
    fontWeight: theme.fontWeight.normal,
    lineHeight: 25,
  },
  box: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#FFF',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  secondText: {
    color: theme.colors.dark,
    fontSize: theme.fontSizes.medium,
    fontWeight: theme.fontWeight.semiBold,
  },
});

export default BoxWithGradientAndButton;
