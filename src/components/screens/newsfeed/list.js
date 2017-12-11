import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
    Dimensions,
    FlatList,
    ImageBackground,
    Image
} from 'react-native';
import Post from '../../reusables/post'

import { Actions } from 'react-native-router-flux';

class List extends Component {
    constructor(props) {
        super(props);		

        this.state = {
            scrollEnabled: true
        }				        
    }

    render() {        
        return (
            <View style={styles.mainView}>
                <FlatList                   
                    scrollEnabled={this.state.scrollEnabled}                
                    data={this.props.data}
                    renderItem={({item}) => {                                                     
                        return <Post 
                            data={item}
                            ratable={true}   
                            scroll={(bool) => {
                                this.setState({scrollEnabled:bool})
                            }}                         
                        />
                    }}        
                    keyExtractor={(item, index) => index}                    
                />
          </View>
        );        
    }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: '#fff'
    }
});

export default List