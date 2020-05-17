import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';

import Post from './Post';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class LodgePosts extends Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    return (
      <KeyboardAwareScrollView viewIsInsideTabBar={true} extraScrollHeight={100}	  style={{width: '100%'}}>
        {this.props.posts.map((post, index) => (
          <Post key={post._id} user={this.props.user} post={post} index={index} token={this.props.token} resetPosts={this.props.resetPosts} />
        ))}
      </KeyboardAwareScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
  },
  row: {
    flexDirection: 'row'
  },
  name: {
    fontWeight: 'bold',
  },
  content: {
    paddingTop: 6,
    paddingBottom: 3
  },
  date: {
    color: 'rgb(100,100,100)'
  },
  optionsButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    height: 25,
    width: 25,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#edf',
    alignItems: 'center',
    justifyContent: 'center'
  }

})

export default LodgePosts;