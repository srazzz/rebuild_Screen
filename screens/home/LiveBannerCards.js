import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import theme from '../theme';
import {homePageData} from '../apiCalls';

const {width, height} = Dimensions.get('window');
const aspectRatio = width / height; //aspectRatio to declare height and width of the card

const ScrollingBox = () => {
  const [liveBannerCards, setLiveBannerCards] = useState(null);

  //alert for Live banners
  const handlePress = title => {
    Alert.alert(title);
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={
          item.id !== liveBannerCards.length.toString()
            ? styles.container
            : styles.container2
        }>
        <TouchableOpacity onPress={() => handlePress(item.title)}>
          <Image style={styles.image} source={{uri: item.image}} />
          <View style={styles.textInBox}>
            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.content}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    homePageData().then(data => {
      setLiveBannerCards(data ? data.liveBanners : null);
    });
  }, []);

  return (
    <View style={styles.svStyle}>
      <FlatList
        data={liveBannerCards}
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
  line: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 2,
    margin: theme.spacing.medium,
  },
  card: {
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
    padding: normalize(6),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heading: {
    color: theme.colors.light,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: theme.fontWeight.bold,
    fontSize: normalize(12),
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
