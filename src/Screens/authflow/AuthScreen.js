import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { observer, inject } from 'mobx-react';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import Input from '../../Components/Input/Input';
import CustomButton from '../../Components/Button/Button';
import TextButton from '../../Components/TextButton/TextButton';

// import startPrivate from '../startPrivateScreen';
@inject('userStore')
@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.store = props.userStore;
  }

  state = {
    username: '',
    password: ''
  }

  changeUserName = text => {
    this.setState({
      username: text
    });
  }

  changePassword = text => {
    this.setState({
      password: text
    });
  }

  loginUser = () => {
    if (this.state.username && this.state.password) {
      axios.post(`${this.store.env}/api/login`, {email: this.state.username, password: this.state.password}).then((res) => {
        try {
          const token = res.headers['x-auth'];
          if (token) {
            this.store.storeToken(token).then(() => {
              this.store.token = token;

              this.store.fetchUser();

            }).catch((err) => {
              alert('An error has occured.' + err)
            })
          } 
        } catch(err) {
          alert('an error has occured.' + err)
        }

       
      }).catch((err) => {
        alert(`Wrong Email or Password`);
      })
  
    } else {
      alert('Username and password fields can\'t be empty.')
    }
  }

  handlePushScreen = () => {
    this.props.navigation.navigate('SignUp')
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../../assets/images/logo.png')} />
        <View style={styles.formContainer}>
          <Input 
            placeholder="Email"
            onChangeText={this.changeUserName}
            value={this.state.username}
          />
          <Input
           placeholder="Password"
           onChangeText={this.changePassword}
           value={this.state.password}
           secureTextEntry />
        </View>
        <View style={{alignItems: 'center', height: 150, justifyContent: 'space-around'}}>
          <CustomButton onPress={this.loginUser} text="Sign In" />
          <TextButton onPress={this.handlePushScreen} text="Sign Up" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: '35%',
    marginBottom: '25%'
  },
  formContainer: {
    height: 150,
    justifyContent: 'space-around'
  }
});

export default App;
