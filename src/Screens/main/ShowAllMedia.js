import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView
} from 'react-native';
import axios from 'axios';
import TappableImage from '../../Components/TappableImage/TappableImage'

const {width, height} = Dimensions.get('screen');

class ShowAllMedia extends Component {
  state = {
    user: this.props.user,
    posts: []
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    const headers = {
      'x-auth': this.props.token
    };
    if (this.props.token) {

      axios.get('https://www.lodge-app.com/api/posts/photos', {headers: headers}).then((res) => {
        let postArray = []
        res.data.forEach((post) => {
          postArray.push(post);
        })

        this.setState({posts: postArray});
      }).catch((err) => {
        alert('We could\'nt fetch your lodge photos.');
      })
    }
  }



  render() {
    return (
      <View style={style.container}>
        <View style={style.topBar}>
          <Text style={style.message}>Photos</Text>
        </View>

        <ScrollView style={style.images}>
          <View style={style.row}>
            {this.state.posts.map((post) => (
                <TappableImage key={post._id} url={post.photo} width={width / 3} />
            ))}
          </View>
        </ScrollView>
        
      </View>
    )
  }
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: width,
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7fb'
  },
  topBar: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 60,
    height: '8%',
    width: '90%',
    backgroundColor: '#2c3e50',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 34,
    color: 'white'
  },
  message: {
    color: 'black',
    fontSize: 23
  },
  images: {
    flexDirection: 'row',
    width: '100%'
  },
})

export default ShowAllMedia;