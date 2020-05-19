import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import moment from 'moment';

import axios from 'axios';
import style from './postStyles';

class ReplyBox extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    content: ''
  }

  changeContent = text => {
    this.setState({
      content: text
    });
  }


  postComment = () => {
    const data = {
      content: this.state.content,
    };

    const headers = {
      'x-auth': this.props.token
    };

    if (this.state.content) {
      axios.post(`${this.store.env}/api/posts/${this.props.post._id}/comment/new`, data, 
        {
          headers: headers
        }
      ).then((res) => {
        this.props.resetPosts();
        this.props.closeReplyBox();
      }).catch((err) => {
        alert(err, res);
      })
    } else {
      alert('Please add content to your post.')
    }

  }
  
  render() {
    return (
      <View style={style.replyBox}>
        <TextInput
          style={style.replyTxtBox}
          placeholder={`Reply to ${this.props.post.authorName.split(' ')[0]}`}
          multiline
          value={this.state.content}
          onChangeText={this.changeContent}
        ></TextInput>
        <TouchableOpacity
          style={style.replyPost}
          onPress={this.postComment}
        >
          <Text style={style.replyPostTxt}>Post</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


export default ReplyBox;