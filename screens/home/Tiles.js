import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {homePageData} from '../apiCalls';
import theme from '../theme';

const numColumns = 3;
const {width, height} = Dimensions.get('window');
const aspectRatio = width / height; //aspectRatio is to declare the height and width of the tile

//each tile contain image and title
const Box = ({title, image}) => {
  // console.log(image);
  return (
    <View style={styles.box}>
      <Image source={{uri: image}} style={styles.image} />
      {/* <Image style={styles.image} source={{ uri: image }} /> */}
      <Text style={styles.boxTitle}>{title}</Text>
    </View>
  );
};

const BoxGrid = () => {
  const [tiles, SetTiles] = useState(null);
  const renderItem = ({item}) => {
    return <Box title={item.title} image={item.image} />;
  };
  useEffect(() => {
    homePageData().then(data => {
      SetTiles(data ? data.tiles : null);
    });
  }, []);
  return (
    <FlatList
      style={{marginHorizontal: theme.spacing.medium}}
      data={tiles}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  tilesList: {
    marginHorizontal: theme.spacing.medium,
  },
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
    aspectRatio: 1.1,
    flex: 0.5,
    resizeMode: 'contain',
  },
});

export default BoxGrid;
