import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { observer, inject } from 'mobx-react';


@inject('userStore')
@observer
class SettingsForm extends Component {

  constructor(props) {
    super(props)

    this.store = props.userStore;

    this.state = {
      email: this.store.user.email,
      firstName: this.store.user.firstName,
      lastName: this.store.user.lastName,
      phone: this.store.user.phone,
      profilePhoto: this.store.user.profilePhoto,
      updated: false,
      loading: false
    }
  
  }
  


  changeEmail = text => {
    this.setState({
      email: text
    });
  }

  changeFirstName = text => {
    this.setState({
      firstName: text
    });
  }

  changeLastName = text => {
    this.setState({
      lastName: text
    });
  }

  changePhone = text => {
    let phone = text.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    phone = !phone[2] ? phone[1] : '(' + phone[1] + ') ' + phone[2] + (phone[3] ? '-' + phone[3] : '');
    this.setState({phone: phone});
  }


  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        response.fileName = 'profilePhoto'        
        this.setState({ profilePhoto: response })
      }
    })
  }

  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  }

  updateProfile = () => {

    this.toggleLoading();

    const data = new FormData();
    if (this.state.profilePhoto.uri) {
      data.append("profilePhoto", {
        name: this.state.profilePhoto.fileName,
        type: this.state.profilePhoto.type,
        uri:
          Platform.OS === "android" ? this.state.profilePhoto.uri : this.state.profilePhoto.uri
      });  
    }
    

    const body = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
    }

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    console.log(data._parts)

    const headers = {
      'x-auth': this.props.token,
      'content-type': 'multipart/form-data'
    }

    axios.post(`${this.store.env}/api/profile/edit`, data, 
      {
        headers: headers
      }
    ).then((res) => {
      this.store.getPosts();
      this.setState({
        email: res.data.email,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        profilePhoto: res.data.profilePhoto ? res.data.profilePhoto : '',
        updated: true,
        loading: false
      })
    }).catch((err) => {
      alert(err);
      this.setState({
        loading: false
      })
    })
     
  }


  render() {
    return (
      <>
        <View style={style.container}>
          <Text>Change User Information:</Text>

          <View style={style.labelContainer}>
            <Text style={style.label}>Email:</Text>
            <TextInput 
              style={style.textInput}
              value={this.state.email}
              placeholder="Email"
              onChangeText={this.changeEmail}
            ></TextInput>
          </View>

          <View style={style.labelContainer}>
            <Text style={style.label}>First Name:</Text>
            <TextInput
              style={style.textInput}
              value={this.state.firstName}
              placeholder="John"
              onChangeText={this.changeFirstName}
            ></TextInput>
          </View>

          <View style={style.labelContainer}>
            <Text style={style.label}>Last Name:</Text>
            <TextInput 
              style={style.textInput}
              value={this.state.lastName}
              placeholder="Smith"
              onChangeText={this.changeLastName}
            ></TextInput>
          </View>

          <View style={style.labelContainer}>
            <Text style={style.label}>Phone:</Text>
            <TextInput
              style={style.textInput}
              value={this.state.phone}
              placeholder="(123) 456-7890"
              onChangeText={this.changePhone}
            ></TextInput>
          </View>


          <View style={style.labelContainer}>
            {this.state.profilePhoto && this.state.profilePhoto.uri && (
              <Image
                source={{ uri: `${this.state.profilePhoto.uri}` }}
                style={{ width: 100, height: 100 }}
              />
            )}

            {this.state.profilePhoto && !this.state.profilePhoto.uri && (
              <Image
                source={{ uri: `${this.state.profilePhoto}` }}
                style={{ width: 100, height: 100 }}
              />
            )}

            <Button title="Choose New Photo" onPress={this.handleChoosePhoto} />
          </View>



        </View>

        <TouchableOpacity onPress={this.updateProfile} style={style.updateBtn}>
          <Text style={style.updateText}>Update</Text>
        </TouchableOpacity>
        <Text>
          {this.state.updated ? 'Updated' : ''}
        </Text>

          <Modal
            transparent={true}
            visible={this.state.loading}
          >
            <View style={style.loadingView}>
              <View style={style.loadingCon}>
                <Image
                  source={{ uri: 'http://www.broadwaybalancesamerica.com/images/ajax-loader.gif' }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            </View>
          </Modal>

      </>
    )
  }
}

const style = StyleSheet.create({
  container: {
    margin: 20,
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
  },
  labelContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%'
  },
  label: {
    paddingTop: 10,
    marginRight: 10,
    width: 80
  },
  textInput: {
    width: '70%',
    height: 40,
    backgroundColor: 'rgb(249,242,252)',
    borderRadius: 10,
    paddingLeft: '5%',
    color: 'rgb(40,40,40)',
    fontSize: 18
  },
  updateBtn: {
    height: '8%',
    width: '90%',
    backgroundColor: '#5573e9',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: .1,
  },
  updateText: {
    fontSize: 34,
    color: 'white'
  },
  loadingView: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.4)'
  },
  loadingCon: {
    width: '70%',
    height: 250,
    backgroundColor: 'white',
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }

})

export default SettingsForm;