import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import normalize from 'react-native-normalize';
import props from './data/info.json';
import theme from '../theme';

const {width, height} = Dimensions.get('window');
const aspectRatio = width / height;

const ScrollingBox = () => {
  const handlePress = title => {
    Alert.alert(title);
  };

  return (
    <View style={styles.svStyle}>
      <ScrollView
        horizontal
        style={styles.card}
        showsHorizontalScrollIndicator={false}>
        {props.scrolling.length !== 0
          ? props.scrolling.map(each => {
              return (
                <View key={each.id} style={styles.container}>
                  <TouchableOpacity onPress={() => handlePress(each.title)}>
                    <View>
                      <Image style={styles.image} source={{uri: each.image}} />
                    </View>
                    <View style={styles.textInBox}>
                      <Text style={styles.heading}>{each.title}</Text>
                      <Text style={styles.content}>{each.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          : null}
      </ScrollView>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  svStyle: {
    paddingBottom: theme.spacing.medium,
    marginLeft: theme.spacing.small,
  },
  line: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 2,
    marginTop: theme.spacing.medium,
    marginRight: theme.spacing.medium,
  },
  card: {
    // width: '100%',
    // marginRight: 16,
  },
  container: {
    width: aspectRatio < 0.6 ? width * 0.29 : width * 0.7,
    marginLeft: theme.spacing.small,
    backgroundColor: '#231732',
    borderRadius: 12,
    alignItems: 'center',
  },
  image: {
    width: aspectRatio < 0.6 ? width * 0.29 : width * 0.7,
    height: normalize(60),
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  textInBox: {
    alignItems: 'center',
    padding: normalize(6), //doubt1
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heading: {
    color: theme.colors.light,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: theme.fontWeight.bold,
    fontSize: normalize(12), //doubt2
    margin: 4,
    textAlign: 'center',
  },
  content: {
    color: theme.colors.light,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: theme.fontWeight.light,
    fontSize: normalize(10),
  },
});

export default ScrollingBox;
