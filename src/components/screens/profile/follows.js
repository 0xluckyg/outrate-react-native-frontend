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
import {	
    minus,
    heart
} from '../../../images/images';
import Cell from '../../reusables/cell'
import Tags from '../../reusables/tags'
import NoContent from '../../reusables/noContent'
import * as profileActions from '../../actions/profileActions';

var width = Dimensions.get('window').width;

class Follows extends Component {
    constructor(props) {
        super(props);		
                        
        this.getData = this.getData.bind(this)
        this.renderFollow = this.renderFollow.bind(this)
    }

    componentWillMount() {
        this.props.getUser()
    }

    getData() {        
        if (this.props.type === 'followers') {                    
            return this.props.profile.my_followers
        } else {            
            return this.props.profile.following
        }        
    }

    renderFollow(data) {            
        return (        
            <Cell 
                height={60}
                data={data}
                buttons={[
                    { 
                        image: minus, 
                        onPress: () => {
                            this.props.unfollowUser(data.user_id)
                        }
                    },                
                ]}
            />                    
        );
    }
    
    render() {        
        return (
            <View style={styles.mainView}>
                {(this.getData().length > 0) ? 
                    <FlatList                                   
                        data={this.getData()}
                        renderItem={({item}) => {                        
                            return this.renderFollow(item)
                        }}        
                        keyExtractor={(item, index) => index}                    
                    /> :

                    <NoContent
                        image={heart}
                        text={(this.props.type == "followers") ? 
                             "No followers" : "No following"
                            }
                    />
                }
          </View>
        );        
    }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: '#fff'
    },
    imageView: {
        flex: 1,
        width: width,
        height: width * 0.9,
    },
    image: {
        flex: 1,
        width: null,
        height: null
    }
});

const mapStateToProps = (state) => (
	{
        profile: state.profile.self,        
	}
)

export default connect(mapStateToProps, profileActions)(Follows)