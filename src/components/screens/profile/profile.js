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
import Posts from '../../reusables/userPosts'
import Me from './me'
import Follows from './follows'

var width = Dimensions.get('window').width;

class Profile extends Component {
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
									tabStyle={{backgroundColor:'#FFF', width:width/4}} 
									textStyle={{color:'#000'}} 
									underlineStyle={{backgroundColor:'#000', height:1}} />}
				>
					<View tabLabel='Posts' style={styles.mainView}>						
						<Posts/>
					</View>
					<View tabLabel="Me" style={styles.mainView}>            	            										
						<Me/>
					</View>
					<View tabLabel='Followers' style={styles.mainView}>						
						<Follows
							type='followers'
						/>
					</View>
					<View tabLabel="Following" style={styles.mainView}>            	            										
						<Follows
							type='following'
						/>
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

export default Profile