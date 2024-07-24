/* Lưu ý: nếu dùng MMKV không thể debug trên chrome hoặc RN Debugger 0.14.0
chờ RN Debugger 0.15 hoặc tham khảo debug trên Reactotron */
import {MMKV} from 'react-native-mmkv';

type KeyValue = {
  isRefreshing: boolean;
  accessToken: string;
  welcomeSound: boolean;
};

class Storage extends MMKV {
  getValue<K extends keyof KeyValue, V extends KeyValue[K] | undefined>(key: K): V {
    switch (key) {
      // boolean
      case 'isRefreshing':
      case 'welcomeSound':
        return super.getBoolean(key) as V;
      // string
      case 'accessToken':
        return super.getString(key) as V;
      // object
      default:
        return this.getObject(key) as V;
    }
  }

  setValue<K extends keyof KeyValue>(key: K, value: KeyValue[K]) {
    switch (typeof value) {
      case 'boolean':
      case 'string':
      case 'number':
        return super.set(key, value);
      default:
        return this.setObject(key, value);
    }
  }

  delete(key: keyof KeyValue) {
    return super.delete(key);
  }

  private setObject(key: string, object: object) {
    try {
      const jsonString = JSON.stringify(object);
      super.set(key, jsonString);
    } catch (error) {}
  }

  private getObject(key: string) {
    try {
      const jsonString = super.getString(key);
      if (jsonString) {
        return JSON.parse(jsonString);
      }
      throw new Error(`No value for key: ${key}`);
    } catch (error) {
      return undefined;
    }
  }
}

const storage = new Storage();

export default storage;
