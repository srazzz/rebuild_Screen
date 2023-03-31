import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import data from './data/boxinfo'; //data is data in the tiles
import theme from '../theme';

const numColumns = 3; 
const {width, height} = Dimensions.get('window');
const aspectRatio = width / height; //aspectRatio is to declear the height and width of the tile

//each tile contain image and title

const Box = ({title, image}) => {
  return (
    <View style={styles.box}>
      <Image source={image} style={styles.image} />
      <Text style={styles.boxTitle}>{title}</Text>
    </View>
  );
};

const BoxGrid = () => {
  const renderItem = ({item}) => {
    return <Box title={item.title} image={item.image} />;
  };
  return (
    <FlatList
      style={{marginHorizontal: theme.spacing.medium}}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  box: {
    width: aspectRatio < 0.48 ? width * 0.293 : width * 0.2887,
    height: aspectRatio < 0.48 ? width * 0.293 : width * 0.26,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: theme.spacing.small,
    marginBottom: theme.spacing.small,
    padding: theme.spacing.small,
    backgroundColor: '#231732',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  boxImage: {
    backgroundColor: theme.colors.light,
  },
  boxTitle: {
    fontSize: theme.fontSizes.small,
    fontWeight: theme.fontWeight.semiBold,
    color: theme.colors.light,
    textAlign: 'center',
    fontFamily: 'SF Pro Display',
  },
  image: {
    margin: theme.spacing.small,
  },
});

export default BoxGrid;