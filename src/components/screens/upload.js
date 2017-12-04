import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class Upload extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <TouchableOpacity style={styles.capture} onPress={this.takePicture.bind(this)}/>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    // options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,    
	backgroundColor: '#000',    
	height: 50,
	width: 50,
	borderWidth: 2,
	borderColor: '#fff',	
	borderRadius:25,
    margin: 40
  }
});

export default Upload