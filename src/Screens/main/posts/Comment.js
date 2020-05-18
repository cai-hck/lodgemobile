import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import moment from 'moment';
import axios from 'axios';
import FastImage from 'react-native-fast-image'
import { observer, inject } from 'mobx-react';

import ReplyBox from './ReplyBox';
@inject('userStore')
@observer
class Comment extends Component {
  constructor(props) {
    super(props);

    this.store = props.userStore;
  }

  state = {
    showOptions: false,
    liked: false,
    content: this.props.comment.content,
    editMode: false
  }

  componentDidMount() {
    this.likeButton();
  }

  deleteComment = () => {
    const headers = {
      'x-auth': this.store.token
    };

    axios.post(`https://www.lodge-app.com/api/comments/${this.props.comment._id}/delete`, {}, {headers: headers} ).then((res) => {
      this.store.getPosts();
      this.setState({showOptions: false})
    }).catch((err) => {
      alert('Something went wrong. Maybe you don\'t have permission to do that.');
    })
  }

  updateContent = () => {
    const headers = {
      'x-auth': this.store.token
    };

    axios.post(`https://www.lodge-app.com/api/comments/${this.props.comment._id}/edit`, {content: this.state.content}, {headers: headers} ).then((res) => {
      this.store.getPosts();
      this.setState({editMode: false})
    }).catch((err) => {
      alert('Something went wrong. Maybe you don\'t have permission to do that.');
    })

  }


  likeComment = () => {
    const headers = {
      'x-auth': this.store.token
    };

    axios.post(`https://www.lodge-app.com/api/comments/${this.props.comment._id}/like`, {}, {headers: headers} ).then((res) => {
      this.store.getPosts();
      this.setState({showOptions: false, liked: !this.state.liked})
    }).catch((err) => {
      alert('Something went wrong. Maybe you don\'t have permission to do that.');
    })
  }

  likeButton = () => {
    this.props.comment.likes.forEach((like) => {
      if (like.userId == this.store.user._id) {
        return this.setState({liked: true})
      }
    })
  }



  renderLikeText = () => {
    const length = this.props.comment.likes.length;
    if (length) {
      switch(length) {
        case 1:
          return <Text style={style.commentLikeText}>by {this.props.comment.likes[0].name.split(' ')[0]}</Text>
          break;
        case 2:
          return <Text style={style.commentLikeText}>by {this.props.comment.likes[0].name.split(' ')[0]} and {this.props.comment.likes[1].name.split(' ')[0]}</Text>
          break;
        case 3:
          return <Text style={style.commentLikeText}>by {this.props.comment.likes[0].name.split(' ')[0]}, {this.props.comment.likes[1].name.split(' ')[0]} and {length - 2} other</Text>
          break;
        default:
          return <Text style={style.commentLikeText}>by {this.props.comment.likes[0].name.split(' ')[0]}, {this.props.comment.likes[1].name.split(' ')[0]} and {length - 2} others</Text>

      }
    }
    return <Text></Text>
  }

  changeContent = text => {
    this.setState({
      content: text
    });
  }

  
  render() {
    return (
      <>
        <TouchableWithoutFeedback onPress={() => this.setState({showOptions: false})}>
          <View>
          <View style={style.commentContainer}>
            <View style={style.row}>
              <FastImage 
                style={{width: 50, height: 50, marginRight: 10}}
                source={{uri: this.props.comment.authorPhoto, priority: FastImage.priority.normal,
                }}
              />
              <View>
                <View style={style.nameRow}>
                  <Text style={style.name}>{this.props.comment.authorName}</Text>
                  <Text style={style.date}>{moment(this.props.comment.createdAt).fromNow()}</Text>
                  {this.props.comment.edited ? <Text style={style.date}> (Edited)</Text> : null}
                </View>


                {this.state.editMode ? (
                  <>
                    <TextInput 
                      multiline
                      style={style.editInput}
                      value={this.state.content}
                      onChangeText={this.changeContent}
                    />
                    <View style={style.commentUpdateButtons}>
                      <Text onPress={this.updateContent}>Update</Text>
                      <Text onPress={() => this.setState({editMode: false, content: this.props.comment.content})}>Cancel</Text>
                    </View>
                  </>
                ) : (
                  <Text style={style.content}>{this.state.content}</Text>
                )}


              </View>
            </View>
            <TouchableOpacity onPress={() => this.setState({showOptions: !this.state.showOptions})} style={style.commentOptionsButton}>
              <Text>☰</Text>
            </TouchableOpacity>

            {this.state.showOptions && (
              <View style={style.commentOptions}>
                {this.store.user._id === this.props.comment.authorId || this.store.user.admin ? (
                  <>
                    {this.store.user._id === this.props.comment.authorId ? <Text onPress={() => this.setState({editMode: true, showOptions: false})} style={style.optionText}>Edit</Text> : <Text style={style.optionText}>Member Info</Text>}
                    <Text onPress={this.deleteComment} style={style.optionText}>Delete</Text>
                  </>
              ) : (
                <Text style={style.optionText}>Member Info</Text>
              )}

              </View>
            )}


            <View style={style.commentReplyContainer}>

            {/* <TouchableOpacity onPress={() => this.setState({showReplyBox: !this.state.showReplyBox})} style={style.replyBtn}>
              <Text style={style.replyTxt}>{this.state.showReplyBox ? 'Hide Reply' : 'Reply'}</Text>
            </TouchableOpacity> */}
            <View style={style.row}>
              <TouchableOpacity onPress={this.likeComment} style={style.commentLikeBtn}>
                <Text>{this.state.liked ? `❤️ ${this.props.comment.likes.length}` : `🖤 ${this.props.comment.likes.length}`}</Text>
              </TouchableOpacity>
              {this.renderLikeText()}
            </View>
            </View>


          </View>        
        

          </View>


        </TouchableWithoutFeedback>

      </>
    )
  }
}



export default Comment;