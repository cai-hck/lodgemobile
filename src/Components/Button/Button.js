import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('screen');

class CustomButton extends Component {
  render() {
    return (
      <TouchableOpacity style={style.buttonContainer} {...this.props}>
        <Text style={style.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  buttonContainer: {
    height: .08 * height,
    width: 0.9 * width,
    backgroundColor: 'rgb(255,82,76)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 24,
    color: 'white'
  }
});

export default CustomButton;