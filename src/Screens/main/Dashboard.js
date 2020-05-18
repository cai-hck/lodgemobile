import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { observer, inject } from 'mobx-react';

// import { Navigation } from 'react-native-navigation';

import AsyncStorage from '@react-native-community/async-storage';

// import startPublic from '../startPublicScreen';
import axios from 'axios';

import LodgePosts from './posts/LodgePosts';

@inject('userStore')
@observer
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.store = props.userStore;
    this.state = {
      user: '',
      posts: []
    }
  
  }

  componentDidMount() {
    this.store.getPosts();
  }

  goToNewPostScreen = () => {
    this.props.navigation.navigate('CreateNewPost');
  }

  render() {
    return (
      <View style={style.container}>
        {this.store.user.lodges[0] && (
          <View style={style.createNewPost}>
            <TouchableOpacity style={style.newPostBtn} onPress={this.goToNewPostScreen}>
              <Text style={style.newPostText}>✏️ Create New Post</Text>
            </TouchableOpacity>
          </View>
        )}
        <LodgePosts user={this.store.user} token={this.store.token} posts={this.store.posts} resetPosts={() => this.getPosts()} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    // marginTop: 90,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7fb'
  },
  createNewPost: {
    marginTop: 3,
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
    marginBottom: 1.5,
    elevation: 20,
  },
  newPostBtn: {
    height: 60,
    width: '95%',
    backgroundColor: '#eef',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .01,
    borderRadius: 0
  },
  newPostText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'rgb(13,63,123)'
  },
  message: {
    color: 'black',
    fontSize: 23
  }
})

export default Dashboard;