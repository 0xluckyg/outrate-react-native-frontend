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
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Camera from 'react-native-camera';
import CameraRollPicker from 'react-native-camera-roll-picker';
import CustomScrollTab from '../reusables/customScrollTab'
var width = Dimensions.get('window').width;

class Upload extends Component {
	constructor(props) {
        super(props);		
				
        this.getSelectedImages = this.getSelectedImages.bind(this)
	}

	getSelectedImages() {

	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollableTabView
					style={{marginTop:20}}
					initialPage={0}
					renderTabBar={() => <CustomScrollTab 								
										style={{marginTop: 10}}	
										tabStyle={{backgroundColor:'#FFF', width:width/2}} 
										textStyle={{color:'#000'}} 
										underlineStyle={{backgroundColor:'#000', height:1}} />}				
					>		
					<View tabLabel="Camera" style={styles.mainView}>            	            				
						<Camera
							ref={(cam) => {
								this.camera = cam;
							}}
							style={styles.preview}
							aspect={Camera.constants.Aspect.fill}>
						<TouchableOpacity style={styles.capture} onPress={this.takePicture.bind(this)}/>
						</Camera>
					</View>		
					<View tabLabel='Album' style={styles.mainView}>
						<CameraRollPicker
							callback={this.getSelectedImages} 
							imageMargin={0}
						/>
					</View>					
				</ScrollableTabView>								
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
		backgroundColor: '#fff'
	},
	mainView: {
		flex: 1		
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