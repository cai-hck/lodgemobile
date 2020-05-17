import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import App from './App';
import userStore from './stores/userStore';

class ProviderDom extends Component {
  render() {
    return (
        <Provider userStore={userStore}>
            <App />
        </Provider>
    );  
  }
}

export default ProviderDom;
