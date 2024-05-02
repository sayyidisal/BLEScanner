import React, {useEffect} from 'react';
import {
  Button,
  StyleSheet,
  View,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

const {BLEModule} = NativeModules;

const eventEmitter = new NativeEventEmitter(BLEModule);

const App = () => {
  useEffect(() => {
    const scanStartedSubscription = eventEmitter.addListener(
      'BLE_SCAN_STARTED',
      () => {
        console.log('Scan started');
      },
    );
    const scanStoppedSubscription = eventEmitter.addListener(
      'BLE_SCAN_STOPPED',
      () => {
        console.log('Scan stopped');
      },
    );

    return () => {
      scanStartedSubscription.remove();
      scanStoppedSubscription.remove();
    };
  }, []);

  const startScan = () => {
    BLEModule.startScan();
  };

  const stopScan = () => {
    BLEModule.stopScan();
  };

  return (
    <View style={styles.container}>
      <Button title="Start Scan" onPress={startScan} />
      <Button title="Stop Scan" onPress={stopScan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
