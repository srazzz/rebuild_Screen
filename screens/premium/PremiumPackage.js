import react, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from '../theme';

const data = [
  {
    name: 'STARTER',
    prices: {
      Monthly: '99',
      Quarter: '249',
      Year: '899',
    },
    details: [
      '4 Live Classes (per month)',
      'Special Regimens',
      'Analytics Reports',
      'Tracker',
    ],
  },
  {
    name: 'LITE',
    prices: {
      Monthly: '249',
      Quarter: '689',
      Year: '2299',
    },
    details: [
      '8 Live Classes (per month)',
      'Special Regimens',
      'Analytics Reports',
      'Tracker',
      '5.00% Test Discounts',
    ],
  },
  {
    name: 'CORE',
    prices: {
      Monthly: '649',
      Quarter: '1749',
      Year: '5949',
    },
    details: [
      '100 Live Classes (per month)',
      'Special Regimens',
      'Analytics Reports',
      'Tracker',
      '7.50% Test Discounts',
    ],
  },
];

const Premium = () => {
  const [indexSelected, setIndexSelected] = useState({
    STARTER: 2,
    LITE: 2,
    CORE: 2,
  });

  return (
    <>
      {data.length !== 0
        ? data.map(eachItem => (
            <View style={styles.box} key={eachItem.name}>
              <View style={styles.packageHeading}>
                <Text style={styles.packageName}>{eachItem.name}</Text>
                <Text style={[styles.textHeading, styles.fontStyle]}>
                  Premium Package
                </Text>
              </View>

              <View style={styles.boxesView}>
                {eachItem.prices &&
                  Object.keys(eachItem.prices).map((key, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        setIndexSelected({
                          ...indexSelected,
                          [eachItem.name]: index,
                        })
                      }>
                      <View
                        style={[
                          styles.priceBox,
                          {
                            borderColor:
                              index === indexSelected[eachItem.name]
                                ? theme.colors.primary
                                : theme.colors.light,
                          },
                        ]}>
                        {index === indexSelected[eachItem.name] ? (
                          <Ionicons
                            name="checkbox"
                            size={15}
                            style={styles.checkbox}
                          />
                        ) : null}

                        <View style={styles.textInBox}>
                          <View>
                            <FontAwesome
                              name="rupee"
                              size={20}
                              style={[styles.rupeeIcon, styles.fontStyle]}
                            />
                          </View>
                          <View>
                            <Text style={[styles.priceText, styles.fontStyle]}>
                              {eachItem.prices[key]}
                            </Text>
                          </View>
                        </View>

                        <Text style={[styles.timeText, styles.font]}>
                          {key}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>

              {eachItem.details.map(detail => (
                <View style={styles.listStyle} key={detail}>
                  <Entypo
                    name="dot-single"
                    size={24}
                    style={styles.iconColor}
                  />
                  <Text style={[styles.listText, styles.fontStyle]}>
                    {detail}
                  </Text>
                </View>
              ))}

              <View style={styles.subscribe}>
                <MaterialCommunityIcons
                  name="lock-open-outline"
                  size={20}
                  style={styles.iconColor}
                />
                <Text style={[styles.subscribeText, styles.fontStyle]}>
                  Subscribe to Premium
                </Text>
              </View>
            </View>
          ))
        : null}
    </>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
  },
  box: {
    backgroundColor: '#231732',
    borderRadius: 12,
    marginBottom: theme.spacing.large,
    paddingTop: 10,
  },
  boxesView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing.small,
  },
  packageHeading: {
    felx: 1,
    color: theme.colors.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageName: {
    fontSize: normalize(theme.fontSizes.large),
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  textInBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHeading: {
    fontSize: normalize(theme.fontSizes.large),
    fontWeight: theme.fontWeight.bold,
    paddingLeft: theme.spacing.small,
    color: theme.colors.light,
  },
  priceBox: {
    borderWidth: 1,
    marginTop: theme.spacing.medium,
    width: normalize(85), //doubt here
    height: normalize(85),
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rupeeIcon: {
    color: theme.colors.light,
    // fontSize: normalize(theme.fontSizes.extraLarge),
    fontWeight: theme.fontWeight.bold,
    paddingTop: 3,
  },
  priceText: {
    color: theme.colors.light,
    fontSize: normalize(theme.fontSizes.extraLarge),
    fontWeight: theme.fontWeight.bold,
    marginLeft: 3,
  },
  timeText: {
    fontSize: normalize(16),
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.light,
  },
  listStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.medium,
  },
  listText: {
    color: 'white',
    fontSize: normalize(theme.fontSizes.small),
    fontWeight: theme.fontWeight.semiBold,
    margin: 0,
  },
  iconColor: {
    color: theme.colors.light,
  },
  subscribe: {
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: theme.spacing.small,
    marginTop: 15,
  },
  subscribeText: {
    color: theme.colors.light,
    fontSize: normalize(theme.fontSizes.medium),
    fontWeight: 500,
    marginLeft: 5,
  },
  checkbox: {
    alignSelf: 'flex-end',
    color: theme.colors.primary,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: normalize(9),
  },
});
export default Premium;
