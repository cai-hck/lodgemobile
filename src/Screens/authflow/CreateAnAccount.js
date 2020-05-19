import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import validator from 'validator';
import { observer, inject } from 'mobx-react';


import Input from '../../Components/Input/Input';
import CustomButton from '../../Components/Button/Button';

@inject('userStore')
@observer
class CreateAnAccount extends Component {

  constructor(props) {
    super(props)

    this.store = this.props.userStore;
  }

  state = {
    email: '',
    password: '',
    confirm: ''
  }

  changeUserName = text => {
    this.setState({
      email: text
    });  
  }

  changePassword = text => {
    this.setState({
      password: text
    });
  }

  changeConfirm = text => {
    this.setState({
      confirm: text
    });
  }


  registerAccount = () => {

    if (this.state.password !== this.state.confirm) {
      return alert('Password confirmation is incorrect.')
    }

    if (validator.isEmail(this.state.email) && this.state.password) {
      axios.post(`${this.store.env}/api/register`, {email: this.state.email, password: this.state.password}).then((res) => {
        if (res.status === 201) {
          this.props.navigation.navigate('Login')
        }
      }).catch((err) => {
        alert('Something went wrong. This user may already exist.')
      })
    } else {
      alert('Please use a proper email')
    }
  }


  render() {
    return (
      <View style={style.container}>
        <View style={style.signUpForm}>
          <Input
            placeholder="email" 
            onChangeText={this.changeUserName}
            value={this.state.email}
          />
          <Input
            placeholder="password" 
            onChangeText={this.changePassword}
            value={this.state.password}
            secureTextEntry
          />
          <Input
            placeholder="confirm password" 
            onChangeText={this.changeConfirm}
            value={this.state.confirm}
            secureTextEntry
          />

        </View>
        <CustomButton text="Sign Up" onPress={this.registerAccount} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  signUpForm: {
    height: 250,
    justifyContent: 'space-around'
  }
})

export default CreateAnAccount