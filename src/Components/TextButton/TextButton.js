import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('screen');

class TextButton extends Component {
  render() {
    return (
      <TouchableOpacity {...this.props}>
        <Text style={style.textButton}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  textButton: {
    color: 'rgb(174,149,149)',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'rgb(174,149,149)',
    fontSize: 17
  }
});

export default TextButton;