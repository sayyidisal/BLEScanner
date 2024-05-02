import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  View,
  NativeModules,
  NativeEventEmitter,
  Text,
} from 'react-native';

const {BLEModule} = NativeModules;

const eventEmitter = new NativeEventEmitter(BLEModule);

const App = () => {
  const [peripherals, setPeripherals] = useState<any>([]);

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
    const peripheralDiscoveredSubscription = eventEmitter.addListener(
      'BLE_PERIPHERAL_DISCOVERED',
      (event: {
        peripheral: any;
        name: any;
        rssi: any;
        advertisementData: any;
      }) => {
        const {peripheral, name, rssi, advertisementData} = event;
        console.log(`Peripheral discovered: ${name}, RSSI: ${rssi}`);
        // Update state to display discovered peripherals
        setPeripherals((prevPeripherals: any) => [
          ...prevPeripherals,
          {peripheral, name, rssi, advertisementData},
        ]);
      },
    );

    return () => {
      scanStartedSubscription.remove();
      scanStoppedSubscription.remove();
      peripheralDiscoveredSubscription.remove();
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
      <View style={styles.peripheralsContainer}>
        <Text style={styles.title}>Discovered Peripherals:</Text>
        {peripherals.map(
          (peripheral: {name: any; peripheral: any; rssi: any}, index: any) => (
            <View key={index} style={styles.peripheralItem}>
              <Text>Name: {peripheral.name}</Text>
              <Text>UUID: {peripheral.peripheral}</Text>
              <Text>RSSI: {peripheral.rssi}</Text>
            </View>
          ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  peripheralsContainer: {
    marginTop: 20,
  },
  peripheralItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
