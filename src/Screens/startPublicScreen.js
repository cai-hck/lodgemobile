import { Navigation } from 'react-native-navigation';

const startPublic = () => {

    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [{
            stack: {
              children: [{
                component: {
                  name: 'Client.AuthScreen',
                  passProps: {
                    text: 'This is tab 1'
                  }
                },
              }],
              options: {
                bottomTabs: {
                  visible: false,
                  text: 'Tab 1',
                  // icon: require('http://www.iconarchive.com/download/i83704/custom-icon-design/mono-general-3/home.ico'),
                  testID: 'FIRST_TAB_BAR_BUTTON'
                },
                topBar: {
                  visible: false
                }
              }
            }
          }]
        },
      }
    });

}

export default startPublic;


