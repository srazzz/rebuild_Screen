//not using this
import AsyncStorage from '@react-native-async-storage/async-storage';

const instructions = () => {
  const errorName = '';
  const showTransition = null;

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('showTransition', false);
    } catch (e) {
      errorName = console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('showTransition');
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      errorName = console.log(e);
    }
  };

  storeData();
  getData();
};

export default instructions;
