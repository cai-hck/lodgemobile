import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { observer, inject } from 'mobx-react';

import FastImage from 'react-native-fast-image'


import moment from 'moment';
import axios from 'axios';
import style from './postStyles';

import ReplyBox from './ReplyBox';
import Comment from './Comment';
import TappableImage from '../../../Components/TappableImage/TappableImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

@inject('userStore')
@observer
class Post extends Component {
  constructor(props) {
    super(props);

    this.store = props.userStore;
  }

  state = {
    showOptions: false,
    liked: false,
    showReplyBox: false,
    editMode: false,
    content: this.props.post.content,
    photo: this.props.post.photo
  }

  componentDidMount() {
    this.likeButton();
  }

  deletePost = () => {
    const headers = {
      'x-auth': this.store.token
    };

    axios.post(`https://www.lodge-app.com/api/posts/${this.props.post._id}/delete`, {}, {headers: headers} ).then((res) => {
      this.store.getPosts();
      this.setState({showOptions: false})
    }).catch((err) => {
      alert('Something went wrong. Maybe you don\'t have permission to do that.');
    })
  }

  likePost = () => {
    const headers = {
      'x-auth': this.store.token
    };

    axios.post(`https://www.lodge-app.com/api/posts/${this.props.post._id}/like`, {}, {headers: headers} ).then((res) => {
      this.setState({showOptions: false, liked: !this.state.liked})
    }).catch((err) => {
      alert('Something went wrong. Maybe you don\'t have permission to do that.');
    })

  }

  updatePost = () => {
    const headers = {
      'x-auth': this.store.token
    };

    axios.post(`https://www.lodge-app.com/api/posts/${this.props.post._id}/edit`, {content: this.state.content}, {headers: headers} ).then((res) => {
      this.store.getPosts();
      this.setState({editMode: false})
    }).catch((err) => {
      alert('Something went wrong. Maybe you don\'t have permission to do that.');
    })

  }

  likeButton = () => {
    this.props.post.likes.forEach((like) => {
      if (like.userId === this.store.user._id) {
        return this.setState({liked: true})
      }
    })

    // return this.setState({liked: false})
  }

  renderLikeText = () => {
    const length = this.props.post.likes.length;
    if (length) {
      switch(length) {
        case 1:
          return <Text style={style.likeText}>by {this.props.post.likes[0].name.split(' ')[0]}</Text>
          break;
        case 2:
          return <Text style={style.likeText}>by {this.props.post.likes[0].name.split(' ')[0]} and {this.props.post.likes[1].name.split(' ')[0]}</Text>
          break;
        case 3:
          return <Text style={style.likeText}>by {this.props.post.likes[0].name.split(' ')[0]}, {this.props.post.likes[1].name.split(' ')[0]} and {length - 2} other</Text>
          break;
        default:
          return <Text style={style.likeText}>by {this.props.post.likes[0].name.split(' ')[0]}, {this.props.post.likes[1].name.split(' ')[0]} and {length - 2} others</Text>

      }
    }
    return <Text></Text>
  }

  unToggleOptions = () => {
    if (this.state.showOptions) {
      this.setState({showOptions: false});
    }
  }

  closeReplyBox = () => {
    if (this.state.showReplyBox) {
      this.setState({showReplyBox: false});
    }
  }

  changeContent = text => {
    this.setState({
      content: text
    });
  }
  
  render() {
    return (
      <>
        <TouchableWithoutFeedback onPress={this.unToggleOptions}>
          <View>
          <View style={style.container}>
            <View style={style.row}>
              <FastImage 
                style={{width: 50, height: 50, marginRight: 10}}
                source={{uri: this.props.post.authorPhoto,priority: FastImage.priority.normal,
                }}
              />
              <View>
                <View style={style.nameRow}>
                  <Text style={style.name}>{this.props.post.authorName}</Text>
                  <Text style={style.date}>{moment(this.props.post.createdAt).fromNow()}</Text>
                  {this.props.post.edited ? <Text style={style.date}> (Edited)</Text> : null}
                </View>
                {this.state.editMode ? (
                  <>
                    <TextInput 
                      multiline
                      style={style.editInput}
                      value={this.state.content}
                      onChangeText={this.changeContent}
                    />
                    <View style={style.updateButtons}>
                      <Text onPress={this.updatePost}>Update</Text>
                      <Text onPress={() => this.setState({editMode: false, content: this.props.post.content})}>Cancel</Text>
                    </View>
                  </>
                ) : (
                  <Text style={style.content}>{this.state.content}</Text>
                )}


                {this.state.photo && (
                  <TappableImage width="92%" url={this.state.photo} />
                )}


              </View>
            </View>
            <TouchableOpacity onPress={() => this.setState({showOptions: !this.state.showOptions})} style={style.optionsButton}>
              <Text>☰</Text>
            </TouchableOpacity>

            {this.state.showOptions && (
              <View style={style.options}>
                {(this.store.user._id === this.props.post.authorId) || (this.store.user.admin)? (
                  <>
                    {this.store.user._id === this.props.post.authorId ? (
                      <Text onPress={() => this.setState({editMode: true, showOptions: false})} style={style.optionText}>Edit</Text>
                      ) : (
                      <Text style={style.optionText}>Member Info</Text>
                    )}
                    <Text onPress={this.deletePost} style={style.optionText}>Delete</Text>
                  </>
              ) : (
                <Text style={style.optionText}>Member Info</Text>
              )}

              </View>
            )}


          </View>        
        
          <View style={style.replyContainer}>

            <TouchableOpacity onPress={() => this.setState({showReplyBox: !this.state.showReplyBox})} style={style.replyBtn}>
              <Text style={style.replyTxt}>{this.state.showReplyBox ? 'Hide Reply' : 'Reply'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.likePost} style={style.likeBtn}>
              <Text>{this.state.liked ? `❤️ ${this.props.post.likes.length}` : `🖤 ${this.props.post.likes.length}`}</Text>
            </TouchableOpacity>
            {this.renderLikeText()}
          </View>

          <View>
          {this.props.post.comments.length >= 1 && (
            <View style={style.commentCell}>
              <Text style={style.commentTitle}>Comments</Text>
              {this.props.post.comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  user={this.store.user}
                  token={this.props.token}
                  resetPosts={this.props.resetPosts}
                />
              ))}
            </View>
            )
          }
          </View>
          {this.state.showReplyBox ? (
                <ReplyBox 
                  user={this.store.user}
                  post={this.props.post}
                  index={this.props.index}
                  token={this.props.token}
                  resetPosts={this.props.resetPosts}
                  closeReplyBox={this.closeReplyBox}
                />
          ) : (<></>)}

          </View>


        </TouchableWithoutFeedback>

      </>
    )
  }
}


export default Post;