import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
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

  const renderItem = ({item}) => {
    return (
      <View
        style={
          item.id !== props.scrolling.length
            ? styles.container
            : styles.container2
        }>
        <TouchableOpacity onPress={() => handlePress(item.title)}>
          <View>
            <Image style={styles.image} source={{uri: item.image}} />
          </View>
          <View style={styles.textInBox}>
            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.content}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.svStyle}>
      <FlatList
        data={props.scrolling}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.card}
      />
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  svStyle: {
    // paddingBottom: theme.spacing.medium,
  },
  line: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 2,
    margin: theme.spacing.medium,
  },
  card: {
    // width: '100%',
    // marginRight: 16,
    marginLeft: theme.spacing.medium,
  },
  container: {
    width: aspectRatio < 0.6 ? width * 0.29 : width * 0.7,
    marginRight: theme.spacing.small,
    backgroundColor: '#231732',
    borderRadius: 12,
    alignItems: 'center',
  },
  container2: {
    width: aspectRatio < 0.6 ? width * 0.29 : width * 0.7,
    marginRight: theme.spacing.medium,
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
