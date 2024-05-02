import CoreBluetooth

@objc(BLEManager)
class BLEManager: NSObject, CBCentralManagerDelegate {
    var centralManager: CBCentralManager!
    var peripherals: [CBPeripheral] = []
    var eventEmitter: RCTEventEmitter!

    override init() {
        super.init()
        centralManager = CBCentralManager(delegate: self, queue: nil)
    }

    func startScan() {
        centralManager.scanForPeripherals(withServices: nil, options: nil)
        sendEvent(withName: "BLE_SCAN_STARTED", body: nil)
    }

    func stopScan() {
        centralManager.stopScan()
        sendEvent(withName: "BLE_SCAN_STOPPED", body: nil)
    }

    func sendEvent(withName name: String, body: Any?) {
        eventEmitter.sendEvent(withName: name, body: body)
    }

    // MARK: - CBCentralManagerDelegate

    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        if central.state == .poweredOn {
            // Bluetooth is ready
        } else {
            // Bluetooth is not ready
        }
    }

    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
        // Handle discovered peripheral
        peripherals.append(peripheral)
    }
}
