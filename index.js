/* eslint-disable import/prefer-default-export */
/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// const onMessageReceived = (message) => {
//     Notifications.postLocalNotification({
//       title: 'Local notification',
//       body: 'This notification was generated by the app!',
//       extra: 'data',
//     });
// };

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   //   console.log('Message handled in the background!', remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
