import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import theme from '../theme';
import {premiumPageData} from '../apiCalls';

const Premium = () => {
  //checkbox visibility
  const [indexSelected, setIndexSelected] = useState({});
  const [packageSchemes, setPackageSchemes] = useState(null);

  useEffect(() => {
    //fetching data from api
    try {
      premiumPageData().then(data => {
        setPackageSchemes(data ? data.subscriptionPackages : null);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const defaultSelectedPlans = [];

    const getDefaultSelectedIds = () => {
      packageSchemes.map(eachPackage => {
        defaultSelectedPlans.push(eachPackage.defaultSelectedPlanId);
      });
    };

    if (packageSchemes) {
      getDefaultSelectedIds();
      setIndexSelected({
        starter: defaultSelectedPlans[0],
        lite: defaultSelectedPlans[1],
        core: defaultSelectedPlans[2],
      });
    }
  }, [packageSchemes]);

  return (
    <>
      {packageSchemes && packageSchemes.length !== 0
        ? packageSchemes.map(eachItem => (
            <View style={styles.box} key={eachItem.packageName.trim()}>
              <View style={styles.packageHeading}>
                <Text style={styles.packageName}>{eachItem.packageName}</Text>
                <Text style={[styles.textHeading, styles.fontStyle]}>
                  {eachItem.title}
                </Text>
              </View>

              <View style={styles.boxesView}>
                {eachItem.plans &&
                  eachItem.plans.map((key, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        setIndexSelected({
                          ...indexSelected,
                          [eachItem.packageName.trim().toLowerCase()]: key.id,
                        })
                      }>
                      <View
                        style={[
                          styles.priceBox,
                          {
                            borderColor:
                              key.id ===
                              indexSelected[eachItem.packageName.toLowerCase()]
                                ? theme.colors.primary
                                : theme.colors.light,
                          },
                        ]}>
                        {key.id ===
                        indexSelected[
                          eachItem.packageName.trim().toLowerCase()
                        ] ? (
                          <Ionicons
                            name="checkbox"
                            size={15}
                            style={styles.checkbox}
                          />
                        ) : null}

                        <View style={styles.textInBox}>
                          <Text style={[styles.priceText, styles.fontStyle]}>
                            {eachItem.plans[index].price}
                          </Text>
                        </View>

                        <Text style={[styles.timeText, styles.font]}>
                          {eachItem.plans[index].validity}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>

              {eachItem.description.map(detail => (
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

              <TouchableOpacity style={styles.subscribe}>
                <MaterialCommunityIcons
                  name={eachItem.subscribeButton.icon.name}
                  size={Number(eachItem.subscribeButton.icon.size)}
                  style={styles.iconColor}
                />
                <Text style={[styles.subscribeText, styles.fontStyle]}>
                  {eachItem.subscribeButton.title}
                </Text>
              </TouchableOpacity>
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
