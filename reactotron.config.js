import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import {NativeModules} from 'react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import storage from 'utils/storage';

const scriptURL = NativeModules.SourceCode.scriptURL;
const scriptHostname = scriptURL.split('://')[1].split(':')[0];

const reactotron = Reactotron.configure({host: scriptHostname})
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .use(mmkvPlugin({storage}))
  .connect(); // let's connect!

export const enhancer = Reactotron.createEnhancer();

console.tron = Reactotron;

export default reactotron;
