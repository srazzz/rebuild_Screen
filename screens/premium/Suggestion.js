import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import normalize from 'react-native-normalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';
import {premiumPageData} from '../apiCalls';

const Suggestions = () => {
  const [suggestionsData, setSuggestionsData] = useState([]);

  useEffect(() => {
    try {
      premiumPageData().then(data => {
        setSuggestionsData(data ? data.suggestions : []);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Text style={styles.heading}>You may also like</Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {suggestionsData.length !== 0
            ? suggestionsData.map(item => (
                <View style={styles.suggestion_box} key={item}>
                  <Text>{item}</Text>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.explore}>
        <Text style={styles.explore_text}>Explore more </Text>
        <MaterialCommunityIcons
          name="menu-right"
          size={40}
          style={styles.explore_text}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: theme.spacing.small,
  },
  suggestion_box: {
    backgroundColor: '#231732',
    width: normalize(110),
    height: normalize(80),
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.small,
  },
  heading: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontSize: normalize(theme.fontSizes.medium),
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.light,
    marginBottom: theme.spacing.medium,
  },
  explore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  explore_text: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontSize: normalize(theme.fontSizes.medium),
    fontWeight: theme.fontWeight.normal,
    color: theme.colors.light,
    marginBottom: theme.spacing.medium,
  },
});
export default Suggestions;
