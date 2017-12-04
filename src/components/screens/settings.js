import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';

import { connect } from 'react-redux';

class Settings extends Component {
    constructor(props) {
        super(props);		
				
        
    }
    
    render() {
        return (
			<View style={styles.mainView}>            	            				
			</View>
        );
    }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1
	},
});

export default Settings