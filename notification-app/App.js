import React, {useState} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {NotificationServices} from './notification';

function App(props) {
  const [count, setCount] = useState(1);

  const getNotification = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmtoken');
      const {data} = await axios.post('http://192.168.1.7:3000', {
        fcmToken,
        count,
      });
      setCount(count + 1);
      console.log(data);
    } catch (e) {
      console.log({e});
    }
  };

  return (
    <View style={styles.container}>
      <Button
        // style={styles.buttonStyle}
        onPress={getNotification}
        title={'Click To Get Notifcation'}
      />
      <NotificationServices />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 100,
  },
});

export default App;
