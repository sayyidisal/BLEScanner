import Foundation
import CoreBluetooth
import React

@objc(BLEModule)
class BLEModule: RCTEventEmitter {
    var bleManager: BLEManager!

    override init() {
        super.init()
        bleManager = BLEManager()
        bleManager.eventEmitter = self
    }

    override class func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func constantsToExport() -> [AnyHashable : Any]! {
        return ["EVENT_SCAN_STARTED": "BLE_SCAN_STARTED", "EVENT_SCAN_STOPPED": "BLE_SCAN_STOPPED"]
    }

    override func startObserving() {
        hasListeners = true
    }

    override func stopObserving() {
        hasListeners = false
    }

    override func supportedEvents() -> [String] {
        return ["BLE_SCAN_STARTED", "BLE_SCAN_STOPPED"]
    }

    @objc
    func startScan() {
        bleManager.startScan()
    }

    @objc
    func stopScan() {
        bleManager.stopScan()
    }
}
