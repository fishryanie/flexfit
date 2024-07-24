/**
 * @format
 */

import {AppRegistry, LogBox, NativeModules} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import Reactotron from 'reactotron-react-native';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
