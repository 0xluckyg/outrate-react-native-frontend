import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
    Image,
    Dimensions
} from 'react-native';

import {AppColors} from '../../helper/style';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class NoContent extends Component {

    constructor(props) {
        super(props);		
    }

    render() {
        return (
			<View style={styles.mainView}>
                <View style={styles.contentView}>
                    <Image source={this.props.image} style={styles.imageStyle}/>
                    <Text style={styles.textStyle}>{this.props.text}</Text>
                </View>
			</View>
        );
    }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
	},
    contentView: {
        height: screenHeight * 0.2,
        width: screenHeight * 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        tintColor: 'black',
        height: 80,
        width: 80
    },
    textStyle: {
        marginTop: 20,
        textAlign: 'center',
        color: 'black',
        fontWeight: '300',
        fontSize: 18
    }
});

export default NoContent;