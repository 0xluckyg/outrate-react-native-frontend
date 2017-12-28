import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	Switch,
	Image,
	TouchableOpacity
} from 'react-native';
import {AppColors} from '../../helper/style';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';
import NavBar from '../reusables/navBar';

class Settings extends Component {

    constructor(props) {
        super(props);

		this.renderWhiteComponent = this.renderWhiteContainer.bind(this);
		this.renderGrayComponent = this.renderGrayContainer.bind(this);

		this.state = {
			switchValue:true
		}
    }

	renderWhiteContainer(text, borderTop, borderBottom, isSwitch, image, imageColor, callback, value) {
		const renderSwitch = () => {
			if (isSwitch){
				return <Switch
						style={styles.switchStyle}
						onTintColor={AppColors.main}
						value={value}
						onValueChange={callback}/>
			}
		}

		const renderImage = () => {
			if (image) {
				const thumbnailStyle = {
					resizeMode: 'contain',
					marginLeft: 15,
					height: 30,
					width: 30,
					tintColor: imageColor
				}
				return <Image style={thumbnailStyle} source={image}/>
			}
		}

		return (
			<View
				style={styles.whiteContainerStyle}				
				>
				<View style={styles.whiteContainerRowStyle}>
					<View style={styles.whiteContainerRowLeftStyle}>
						{renderImage()}
						<Text style={styles.whiteContainerTextStyle}>{text}</Text>
					</View>
					{renderSwitch()}
				</View>
			</View>
		) 
	}

	renderGrayContainer(text) {
		return (
			<View style={styles.grayContainerStyle}>
				<Text style={styles.grayContainerTextStyle}>{text}</Text>
			</View>
		)
	}



    render() {
		const b = 0.5

        return (
			//text, borderTop, borderBottom, isSwitch, image, imageColor, callback, value

			<View style={{flex:1}}>
				<NavBar headerText="Settings"/>
				<ScrollView style={styles.containerStyle}>								
					{this.renderGrayContainer()}
					{this.renderGrayContainer('NOTIFICATIONS')}
					{this.renderWhiteContainer('App notifications', b, b, true, null, null, ()=>{}, true)}				
					{this.renderGrayContainer()}
					{this.renderGrayContainer('ACCOUNT')}
					<TouchableOpacity 
						onPress={this.props.logOut}
						activeOpacity={0.5}
					>
						{this.renderWhiteContainer('Log out', b, b, false, null, null)}
						{this.renderGrayContainer()}
					</TouchableOpacity>
				</ScrollView>
			</View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
		backgroundColor: AppColors.appMediumGray
    },
	grayContainerStyle: {
		justifyContent: 'center',
		height: 30,
		backgroundColor: AppColors.appMediumGray
	},
	whiteContainerStyle: {
		borderTopColor: AppColors.appGray,
		borderBottomColor: AppColors.appGray,
		borderTopWidth:0.5,
		borderBottomWidth:0.5,
		justifyContent: 'center',
		height: 45,
		backgroundColor: '#fff'
	},
	whiteContainerRowStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	whiteContainerRowLeftStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignSelf: 'center'
	},
	whiteContainerTextStyle: {
		alignSelf: 'center',
		paddingLeft: 15,
		fontWeight: '200',
		fontSize: 14
	},
	grayContainerTextStyle: {
		paddingLeft: 15,
		fontWeight: '200',
		fontSize: 10
	},
	switchStyle: {
		marginRight: 10
	}
});

export default connect(null, authActions)(Settings)