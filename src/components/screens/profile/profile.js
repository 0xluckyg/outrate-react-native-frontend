import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	Dimensions,
	FlatList,
	Image
} from 'react-native';

import { connect } from 'react-redux';
import * as profileActions from '../../actions/profileActions';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import CustomScrollTab from '../../reusables/customScrollTab'
import Posts from '../../reusables/userPosts'
import NoContent from '../../reusables/noContent'
import Me from './me'
import Follows from './follows'
import {beanie} from '../../../images/images'
import FastImage from 'react-native-fast-image'
import {Actions} from 'react-native-router-flux'

var width = Dimensions.get('window').width;

class Profile extends Component {
    constructor(props) {
		super(props);			
	}
	
	componentWillMount() {
		this.props.getUserPosts(0)		
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
					{(this.props.self.posts != undefined && this.props.self.posts.length > 0) ?
						<View style={styles.container}>														
								<FlatList    
									style={styles.list}                               
									data={this.props.self.posts}
									renderItem={({item}) => {  									
										if (item.image_url) {
											return (
												<TouchableOpacity
													onPress={() => Actions.updateSelected({
														tags: item.tags,
														image: item.image_url
													})}
												>
													<FastImage 
														style={styles.image} 
														source={{
															uri:item.image_url,
															priority: FastImage.priority.normal
														}}													
													/>
												</TouchableOpacity>
											)
										}									
									}}        
									keyExtractor={(item, index) => index}                    
									numColumns={2}
								/>								
						</View> :
						<NoContent
							image={beanie}
							text={'upload a photo!'}
						/>
					}				
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
    list: {
        flexDirection: 'column'
    },
    image: {
        flex: 1,
        width: width/2,
        height: width/2
    }
});

const mapStateToProps = (state) => (
	{
        self: state.profile.self
	}
)

export default connect(mapStateToProps, profileActions)(Profile)