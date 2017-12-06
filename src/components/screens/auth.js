import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	ImageBackground,
	Dimensions,
	Image
} from 'react-native';
import {
	fb,
	main1
} from '../../images/images';
import * as authActions from '../actions/authActions';
import { connect } from 'react-redux';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'

class Auth extends Component {
    constructor(props) {
        super(props);				
	}
    
    render() {
        return (			
			<ImageBackground
				source={main1}
				style={styles.backgroundImage}				
			>
				<View style={styles.overlay}>
						{/* <FBLogin /> */}
						<Text style={styles.appLogo}>
							FASH
						</Text>
						<TouchableOpacity
							onPress={this.props.facebookAuth}
							style={[styles.center, styles.button]}
						>
							<Image style={styles.thumbnailStyle} source={fb}/>
							<Text style={styles.buttonText}>LOGIN WITH FACEBOOK!</Text>
                        </TouchableOpacity>
				</View>
			</ImageBackground>
						
        );
    }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,		
	},
	center: {
        alignItems: 'center',
        justifyContent: 'center'
	},
	backgroundImage: {				
        flex: 1,
        width: null,
        height: null,        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
	},
	overlay: {				
		alignItems: 'center',
		justifyContent: 'space-between',
        height: screenHeight,
        width: screenWidth,
        backgroundColor: 'rgba(0,0,0,0.5)'
	},
	appLogo: {
		paddingTop: screenHeight * 0.3,
		color: 'white',
        fontFamily: 'Avenir',
        fontSize: 25,
	},
	button: {		
		width: screenWidth * 0.7,
		marginBottom: screenWidth * 0.23,
		flexDirection: 'row',
        height: 40,        
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 25
    },
	buttonText: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: 16,
	},
	thumbnailStyle: {
        resizeMode: 'contain',
        marginRight: 15,        
        height: 28,
        width: 28,        
    }
});

export default connect(null, authActions)(Auth);