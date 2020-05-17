import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './Screens/authflow/AuthScreen';
import CreateAnAccount from './Screens/authflow/CreateAnAccount';
import Dashboard from './Screens/main/Dashboard';

const Stack = createStackNavigator();

@inject('userStore')
@observer
class App extends Component {

  constructor(props) {
    super(props);

    this.store = props.userStore;

    this.state = {
      userToken: '',
      user: {}
    }
  }

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    try {
      const value = await AsyncStorage.getItem('x-auth');
      if (value !== null) {
        // We have data!!
        console.log('data');
        this.store.token = value;

        this.store.fetchUser();
      }

      return
  
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return (

          <NavigationContainer>

            {this.store.user ? (
              <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={Dashboard} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen name="Login" component={AuthScreen} />
                <Stack.Screen name="SignUp" component={CreateAnAccount} />
              </Stack.Navigator>
            )}

          </NavigationContainer>
    );  
  }
}

export default App;
