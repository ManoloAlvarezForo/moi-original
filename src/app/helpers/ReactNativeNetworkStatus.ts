import NetInfo from '@react-native-community/netinfo';

/**
 * Web networks status implementation based on: Mozilla
 * See: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 */
export class ReactNativeNetworkStatus {
  listeners = [] as any;
  prevState = null;

  constructor() {
    NetInfo.addEventListener(this.handleNetworkStatusChange.bind(this));
  }

  addListener(listener: any) {
    this.listeners.push(listener);
  }

  removeListener(listener: any) {
    const index = this.listeners.indexOf(listener);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }

  isOffline() {
    return new Promise(resolve => {
      NetInfo.fetch().then(state => {
        resolve(!state.isInternetReachable);
      });
    });
  }

  handleNetworkStatusChange(state: any) {
    const online = state.isInternetReachable;
    // Workaround for Netinfo listener being
    // called twice
    if (online !== this.prevState) {
      this.prevState = online;
      this.listeners.forEach((listener: any) => {
        listener({online});
      });
    }
  }
}
