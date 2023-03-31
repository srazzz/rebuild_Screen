import React from 'react';
import {StyleSheet, View} from 'react-native';
import TopNavBar from './Nav';
import ScrollingBox from './LiveBannerCards';
import BoxGrid from './task';
import Gradient from './SubscribeBanner';
import theme from '../theme';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <TopNavBar />
      <Gradient />
      <ScrollingBox />
      <BoxGrid />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.tertiary,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default HomePage;
