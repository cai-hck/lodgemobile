/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import ProviderDom from './src/Provider';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => ProviderDom);
