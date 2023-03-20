import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';

const benifitList = [
  'Live Yoga Classes Everyday',
  'Live Meditation Session Everyday',
  'Over 145 Holistic Health Regimens',
  'Over 20 Video Based Regimens',
];

const BenifitsPremium = () => {
  return (
    <View>
      <Text style={styles.textHeading}>Unlock Happily Health Premium</Text>
      <View style={styles.benifits}>
        {benifitList.length !== 0
          ? benifitList.map(benifit => {
              return (
                <View key={benifit} style={styles.container}>
                  <Icon
                    name="check-circle-outline"
                    size={18}
                    style={styles.tickIcon}></Icon>
                  <Text style={(styles.heading, styles.benifit)}>
                    {benifit}
                  </Text>
                </View>
              );
            })
          : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textHeading: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: theme.fontWeight.semiBold,
    fontSize: normalize(theme.fontSizes.extraLarge),
    color: theme.colors.light,
    marginBottom: theme.spacing.medium,
    marginTop: theme.spacing.large,
  },
  heading: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: theme.fontWeight.semiBold,
  },
  benifits: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: theme.spacing.large,
  },
  tickIcon: {
    backgroundColor: theme.colors.success,
    borderRadius: 12,
  },
  benifit: {
    fontSize: normalize(theme.fontSizes.medium),
    margin: theme.spacing.small,
    color: theme.colors.light,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
export default BenifitsPremium;
