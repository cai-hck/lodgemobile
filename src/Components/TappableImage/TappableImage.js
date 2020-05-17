import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity, Modal, View, Text, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer'; //https://github.com/ascoders/react-native-image-viewer
import CameraRoll from "@react-native-community/cameraroll";
import FastImage from 'react-native-fast-image'

const {width, height} = Dimensions.get('screen');


class TappableImage extends Component {

  state = {
    showImage: false,
    images : [{
        // Simplest usage.
        url: this.props.url,
    
        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance
    
        // You can pass props to <Image />.
        props: {
            // headers: ...
        }
      }
    ]
  }

  _saveImage = uri => {
    let promise = CameraRoll.saveToCameraRoll(uri);

    promise
        .then(function(result) {
            Alert.alert(
                "Success",
                "Image Saved to Photo Gallery",
                [
                    {
                        text: "OK"
                    }
                ],
                { cancelable: false }
            );
        })
        .catch(function(error) {
            Alert.alert(
                "Error Saving Image",
                error,
                [
                    {
                        text: "OK"
                    }
                ],
                { cancelable: false }
            );
        });
};


  render() {
    return (
      <>
        <TouchableOpacity onPress={() => this.setState({showImage: true})}>
          <Image
            source={{ uri: this.props.url, priority: FastImage.priority.high}}
            style={{ width: this.props.width, aspectRatio: 1/1  }}
          />
        </TouchableOpacity>

        <Modal visible={this.state.showImage} transparent={true}>
          <ImageViewer
            onSave={uri => this._saveImage(uri)}
            onCancel={() => this.setState({showImage: false})}
            imageUrls={this.state.images}
            loadingRender={() => <Text style={{color: 'white'}}>Loading</Text>}
            enableSwipeDown={true}
            menuContext={{
              saveToLocal: "Save Image",
              cancel: "Cancel"
            }}
          />

        </Modal>

      </>
    )
  }
}

const styles = StyleSheet.create({
});

export default TappableImage;