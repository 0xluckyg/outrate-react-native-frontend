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
import * as newsfeedActions from '../../actions/newsfeedActions';

var width = Dimensions.get('window').width;

class Newsfeed extends Component {
    constructor(props) {
        super(props);		
	}
	
	componentWillMount() {
		this.props.getRecentPosts(this.props.recentPosts.length)
		this.props.getTrendingPosts(this.props.trendingPosts.length)      
    }
    
    render() {		
		console.log(this.props.recentPosts)
        return (		
			<View style={styles.mainView}>
				<ScrollableTabView
				style={{marginTop:20}}
				initialPage={0}
				locked={true}
				renderTabBar={() => <CustomScrollTab 								
									style={{marginTop: 10}}	
									tabStyle={{backgroundColor:'#FFF', width:width/2}} 
									textStyle={{color:'#000'}} 									
									underlineStyle={{backgroundColor:'#000', height:1}} />}				
				>				
					<View tabLabel='Latest' style={styles.mainView}>
						<List 
							data={this.props.recentPosts}
							getMore={(length) => {
								this.props.getRecentPosts(length)
							}}
						/>
					</View>
					<View tabLabel="Trending" style={styles.mainView}>            	            				
						<List 
							data={this.props.trendingPosts}
							getMore={(length) => {
								this.props.getTrendingPosts(length)
							}}
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

const mapStateToProps = (state) => (
	{
        recentPosts: state.newsfeed.recentPosts,
        trendingPosts: state.newsfeed.trendingPosts,        
	}
)

export default connect(mapStateToProps, newsfeedActions)(Newsfeed)