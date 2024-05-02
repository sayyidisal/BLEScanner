declare module 'react-native' {
  export interface BLEModule {
    startScan(): void;
    stopScan(): void;
    addListener(event: string, handler: Function): void;
    removeListeners(count: number): void;
  }
}
