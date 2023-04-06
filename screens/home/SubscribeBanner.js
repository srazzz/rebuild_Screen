import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import normalize from 'react-native-normalize';
import theme from '../theme';
import {homePageData} from '../apiCalls';

// Subscription Banner
const Gradient = () => {
  const [liveBannerData, setLiveBannerData] = useState(null);

  useEffect(() => {
    homePageData().then(homeData => {
      setLiveBannerData(homeData);
    });
  }, []);

  if (!liveBannerData) {
    return null;
  } else {
    return (
      <LinearGradient
        colors={['#4C759A', '#886BCB']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.mainContainer}>
        <View style={styles.mainView}>
          <View style={styles.content}>
            <MaterialCommunityIcons
              name={liveBannerData.subscription.icon.name}
              size={parseInt(liveBannerData.subscription.icon.size)}
              color={liveBannerData.subscription.icon.color}
              style={styles.videoIcon}
            />
            <Text style={styles.contentText}>
              {liveBannerData.subscription.description}
            </Text>
          </View>
          <TouchableOpacity style={styles.subscribe}>
            <MaterialCommunityIcons
              name={liveBannerData.subscription.subscribeButton.icon.name}
              size={parseInt(
                liveBannerData.subscription.subscribeButton.icon.size,
              )}
              color={liveBannerData.subscription.subscribeButton.icon.color}
              // style={styles.lockIcon}
            />
            <Text style={styles.subscribeText}>
              {liveBannerData.subscription.subscribeButton.title}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
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
  subscribeText: {
    marginLeft: theme.spacing.small,
    color: theme.colors.dark,
    fontSize: theme.fontSizes.medium,
    fontWeight: theme.fontWeight.semiBold,
  },
});

export default Gradient;
