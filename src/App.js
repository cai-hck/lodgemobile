import React, { Component } from 'react';
import {
  Button
} from 'react-native';

import { observer, inject } from 'mobx-react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthScreen from './Screens/authflow/AuthScreen';
import CreateAnAccount from './Screens/authflow/CreateAnAccount';
import Dashboard from './Screens/main/Dashboard';
import MemberRoster from './Screens/main/MemberRoster';
import Settings from './Screens/main/settings/Settings';
import ShowAllMedia from './Screens/main/ShowAllMedia';
import CreateNewPost from './Screens/main/CreateNewPost';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = createStackNavigator();

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Lodge App" component={Dashboard} />
      <DashboardStack.Screen name="CreateNewPost" component={CreateNewPost} />
    </DashboardStack.Navigator>
  );
}


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

              <Tab.Navigator>
                <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
                <Tab.Screen name="Members" component={MemberRoster} />
                <Tab.Screen name="Photos" component={ShowAllMedia} />
                <Tab.Screen name="Settings" component={Settings} />
              </Tab.Navigator>



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
