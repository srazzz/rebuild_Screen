import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';
import {premiumPageData} from '../apiCalls';

const BenifitsPremium = () => {
  const [packageCardsData, setPackageCardsData] = useState(null);

  useEffect(() => {
    //fetching data from api
    try {
      premiumPageData().then(data => {
        setPackageCardsData(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (packageCardsData === null) {
    return <Text>LOADING.....</Text>;
  } else {
    return (
      <View>
        <Text style={styles.textHeading}>{packageCardsData.title}</Text>
        <View style={styles.benifits}>
          {packageCardsData && packageCardsData.length !== 0
            ? packageCardsData.premiumBenefits.map(benifit => {
                return (
                  <View key={benifit} style={styles.container}>
                    <Icon
                      name="check-circle-outline"
                      size={18}
                      style={styles.tickIcon}
                    />
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
  }
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
