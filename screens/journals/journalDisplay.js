import {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const JournalDisplay = props => {
  const formatAmPm = time => {
    time = time.split(' ');
    ampm = time[1].split(':');
    ampm = ampm[0] > 12 ? 'PM' : 'AM';
    hours = time[1].split(':');
    minutes = hours[1];
    hours = hours[0] > 12 ? hours[0] - 12 : hours[0];
    return time[0] + ' ' + hours + ':' + minutes + ' ' + ampm;
  };
  return (
    <>
      {props.cardsData
        ? props.cardsData.map(eachJournal => {
            return (
              <View style={styles.journal} key={eachJournal.time}>
                {eachJournal.imageSelected[0] !== '' ? (
                  <Image
                    source={{uri: eachJournal.imageSelected[0]}}
                    style={styles.imageStyle}
                  />
                ) : null}

                <View
                  style={
                    eachJournal.imageSelected[0] !== ''
                      ? styles.content
                      : styles.content2
                  }>
                  <Text style={styles.title}>{eachJournal.title}</Text>
                  <Text style={styles.details}>{eachJournal.message}</Text>
                  <Text style={styles.date}>
                    {formatAmPm(eachJournal.time).toUpperCase()}
                  </Text>
                </View>
              </View>
            );
          })
        : null}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '65%',
  },
  content2: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: 'black',
  },
  details: {
    color: '#999999',
    fontSize: 14,
    lineHeight: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },

  journal: {
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    marginBottom: 5,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  date: {
    alignSelf: 'flex-end',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
export default JournalDisplay;
