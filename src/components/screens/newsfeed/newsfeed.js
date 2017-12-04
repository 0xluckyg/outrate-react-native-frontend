import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import CustomScrollTab from '../../reusables/customScrollTab'
import List from './list'

var width = Dimensions.get('window').width;

class Newsfeed extends Component {
    constructor(props) {
        super(props);		
			
        
    }
    
    render() {
        return (
			<View style={styles.mainView}>
				<ScrollableTabView
				style={{marginTop:20}}
				initialPage={0}
				renderTabBar={() => <CustomScrollTab 								
									style={{marginTop: 10}}	
									tabStyle={{backgroundColor:'#FFF', width:width/2}} 
									textStyle={{color:'#000'}} 
									underlineStyle={{backgroundColor:'#000', height:1}} />}				
				>				
					<View tabLabel='Latest' style={styles.mainView}>
						<List/>
					</View>
					<View tabLabel="Trending" style={styles.mainView}>            	            				
						<List/>
					</View>
				</ScrollableTabView>
			</View>
        );
    }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: '#fff'
	},
});

export default Newsfeed