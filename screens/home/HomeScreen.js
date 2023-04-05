import React from 'react';
import {StyleSheet, View} from 'react-native';
import BoxGrid from './Tiles';
import Gradient from './SubscribeBanner';
import ScrollingBox from './LiveBannerCards';
import TopNavBar from './HomeNavigation';
import theme from '../theme';

//homeScreen page

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
