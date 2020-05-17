import { Navigation } from 'react-native-navigation';
import axios from 'axios';

const startPrivate = (value) => {


  axios.get('https://www.lodge-app.com/api/profile', {
    headers: {
      'x-auth': value,
    },
  }).then((res) => {



    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [{
            stack: {
              children: [{
                component: {
                  name: 'Client.Dashboard',
                  passProps: {
                    token: value,
                    user: res.data
                  }
                }
              }],
              options: {
                bottomTab: {
                  text: 'Posts',
                  icon: require('../../assets/images/logos.png'),
                  testID: 'FIRST_TAB_BAR_BUTTON'
                }
              }
            }
          },
          {
            component: {
              name: 'Client.MemberRoster',
              passProps: {
                text: 'Members',
                token: value,
                user: res.data
              },
              options: {
                topBar: {
                  visible: true,
                  title: {
                    text: 'Member Roster',
                    color: '#000'
                  }
                },          
                bottomTab: {
                  text: 'Members',
                  icon: require('../../assets/images/member.png'),
                  testID: 'SECOND_TAB_BAR_BUTTON'
                },
              }
            }
          },
          {
            component: {
              name: 'Client.ShowAllMedia',
              passProps: {
                text: 'Photos',
                token: value,
                user: res.data
              },
              options: {
                topBar: {
                  visible: true,
                  title: {
                    text: 'All Photos',
                    color: '#000'
                  }
                },          
                bottomTab: {
                  text: 'Photos',
                  icon: require('../../assets/images/photos.png'),
                  testID: 'THIRD_TAB_BAR_BUTTON'
                },
              }
            }
          },
          {
            component: {
              name: 'Client.Settings',
              passProps: {
                text: 'settings tab',
                token: value,
                user: res.data
              },
              options: {
                bottomTab: {
                  text: 'Settings',
                  icon: require('../../assets/images/settings.png'),
                  testID: 'FOURTH_TAB_BAR_BUTTON'
                },
              }
            }
          }]
        }
      }
    });






  }).catch((err) => {
   return alert(err);
  })





}





fetchUser = async () => {
  try {
    const value = await AsyncStorage.getItem('x-auth');
    if (value !== null) {
      // We have data!!
      axios.get('https://www.lodge-app.com/api/profile', {
        headers: {
          'x-auth': value,
        },
      }).then((res) => {
        return res.data;
      }).catch((err) => {
       return alert(err);
      })
    }
  } catch (error) {
    // Error retrieving data
  }

}




export default startPrivate;


