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
	mock1,
	mock2,
	mock3
} from '../../images/images';

var width = Dimensions.get('window').width;

class Posts extends Component {
    constructor(props) {
        super(props);		
				        
    }
    
    render() {
        console.log('allmyposts',this.props.data.posts);
        // debugger;
        return (
            <View style={styles.container}>
                <FlatList    
                    style={styles.list}                               
                    data={this.props.data.posts}
                    renderItem={({item}) => {                        
                        return <Image style={styles.image} source={{uri:item.image_url}}></Image>
                    }}        
                    keyExtractor={(item, index) => index}                    
                    numColumns={2}
                />
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

export default Posts