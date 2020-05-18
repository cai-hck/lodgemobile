import { observable, action, computed, toJS } from 'mobx';
import axios from 'axios';

class UserStore {


    @observable token = '';

    @observable user;


    @action fetchUser = () => {
        axios.get('https://www.lodge-app.com/api/profile', {
            headers: {
              'x-auth': this.token,
            },
          }).then((res) => {
            this.user = res.data;
            
          })
    }

    @observable posts = [];

    @action getPosts = () => {
        const headers = {
          'x-auth': this.token
        };

        if (this.token) {
    
          axios.get('https://www.lodge-app.com/api/posts/', {headers: headers}).then((res) => {
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
