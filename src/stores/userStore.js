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

}

const userStore = new UserStore();

export default userStore;
