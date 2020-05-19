import { observable, action, computed, toJS } from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class UserStore {

    // @observable env = 'http://localhost:5000';
    @observable env = 'https://www.lodge-app.com';


    @observable token = '';

    @observable user;


    @action fetchUser = () => {
        axios.get(`${this.env}/api/profile`, {
            headers: {
              'x-auth': this.token,
            },
          }).then((res) => {
            this.storeToken(this.token);
            this.user = res.data;
          })
    }

    storeToken = async (value) => {
        try {
          await AsyncStorage.setItem('x-auth', value)
        } catch (e) {
            alert(e)
          // saving error
        }
    }
      
    @observable posts = [];

    @action getPosts = () => {
        const headers = {
          'x-auth': this.token
        };

        if (this.token) {
    
          axios.get(`${this.env}/api/posts/`, {headers: headers}).then((res) => {
            let postArray = []
            res.data.forEach((post) => {
              postArray.push(post);
            })
            this.posts = postArray;
          }).catch((err) => {
            alert('Please ask an officer of your lodge to be added to their members list.');
          })
        }
      }
    


}

const userStore = new UserStore();

export default userStore;
