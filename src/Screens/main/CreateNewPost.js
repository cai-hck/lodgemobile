import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Button,
  Modal,
  TouchableOpacity
} from 'react-native';
import { observer, inject } from 'mobx-react';
import ImagePicker from 'react-native-image-picker';

import axios from 'axios';

@inject('userStore')
@observer
class CreateNewPost extends Component {
  constructor(props) {
    super(props);

    this.store = props.userStore;

    this.props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={this.navigationButtonPressed} title="Post" />
      )
    })


    this.state = {
      content: '',
      photo: '',
      loading: false
    }
  }


  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  }

  navigationButtonPressed = () => {
    this.toggleLoading();
    const data = new FormData();
    if (this.state.photo.uri) {
      data.append("photo", {
        name: 'photo',
        type: this.state.photo.type,
        uri:
          Platform.OS === "android" ? this.state.photo.uri : this.state.photo.uri
      });  
    }
    
    const body = {
      content: this.state.content
    }

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    const headers = {
      'x-auth': this.store.token,
      'content-type': 'multipart/form-data'
    }

    if (this.state.content) {
      axios.post(`${this.store.env}/api/post/new`, data, 
        {
          headers: headers
        }
      ).then((res) => {
        this.toggleLoading();
        this.store.getPosts();
        this.props.navigation.navigate('Lodge App');
      }).catch((err) => {
        alert(err);
        this.toggleLoading();
      })

    } else {
      alert('Please add content to your post.')
    }

  }

  changeContent = text => {
    this.setState({
      content: text
    });
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  render() {
    return (
      <View style={style.container}>
        <Button title="Add Image" onPress={this.handleChoosePhoto} />
        <TextInput
          multiline
          style={style.input}
          placeholder="What's on your mind?"
          value={this.state.content}
          onChangeText={(text) => this.changeContent(text)}
        ></TextInput>

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


        <Image
          source={{ uri: this.state.photo.uri }}
          style={{ width: '100%', height: 300 }}
        />


      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7fb'
  },
  input: {
    marginTop: 10,
    padding: 40,
    fontSize: 22,
    paddingTop: 40,
    width: '100%',
    height: 400,
    backgroundColor: 'white'
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

export default CreateNewPost;