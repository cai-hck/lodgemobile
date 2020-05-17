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

    // Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  static get options() {
    return {
      topBar: {
        visible: true,
        title: {
          text: 'Lodge App'
        },
      }
    };
  }

  state = {
    user: '',
    posts: []
  }

  componentDidMount() {
    this.getPosts();
  }

  goToNewPostScreen = () => {
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: 'Client.CreateNewPost',
    //     passProps: {
    //       text: 'Pushed screen',
    //       user: this.props.user,
    //       token: this.props.token
    //     },
    //     options: {
    //       topBar: {
    //         visible: true,
    //         title: {
    //           text: 'Create New Post'
    //         },
    //         rightButtons: [
    //           {
    //             id: 'buttonOne',
    //             systemItem: 'compose'
    //           }
    //         ]
    //       },
    //       bottomTabs: {
    //         visible: false
    //       }
    //     }
    //   }
    // })
  }


  getPosts = () => {
    const headers = {
      'x-auth': this.store.token
    };
    if (this.store.token) {

      axios.get('https://www.lodge-app.com/api/posts/', {headers: headers}).then((res) => {
        let postArray = []
        res.data.forEach((post) => {
          postArray.push(post);
        })

        this.setState({posts: postArray});
      }).catch((err) => {
        alert('Please ask an officer of your lodge to be added to their members list.');
      })
    }
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
        <LodgePosts user={this.store.user} token={this.store.token} posts={this.state.posts} resetPosts={() => this.getPosts()} />
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
  createNewPost: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
    marginBottom: 1.5
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