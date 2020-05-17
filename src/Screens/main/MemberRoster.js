import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import TappableImage from '../../Components/TappableImage/TappableImage'
import axios from 'axios';

class MemberRoster extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  state = {
    members: []
  }

  componentDidAppear() {
    this.getRoster()
  }

  getRoster = () => {
    const headers = {
      'x-auth': this.props.token
    };

    axios.get('https://www.lodge-app.com/api/lodge/roster', {headers: headers}).then((res) => {
      this.setState({members: res.data});
    }).catch((err) => {
      this.setState({members: [this.props.user]})
    })

  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.topBar}>
          <Text style={style.topBarText}>Member Roster</Text>
        </View>

        <ScrollView style={style.contactList}>
          {this.state.members.map((member) => (
            <View key={member._id} style={style.contactContainer}>
              <View style={{marginRight: 10}}>
                <TappableImage  url={member.profilePhoto} width={50} />
              </View>
              <View style={style.content}>
                <Text style={style.bold}>{member.firstName} {member.lastName}</Text>
                <Text>{member.email}</Text>
                <Text>{member.phone}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
  topBarText: {
    color: 'black',
    fontSize: 23
  },
  contactList: {
    width: '100%'
  },
  contactContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    shadowOffset:{  width: .5,  height: .5,  },
    shadowColor: 'black',
    shadowOpacity: .1,
    padding: 20
  },
  bold: {
    fontWeight: 'bold'
  }
})

export default MemberRoster;