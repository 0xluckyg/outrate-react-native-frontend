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
import NoContent from '../../reusables/noContent'
import { Actions } from 'react-native-router-flux';
import { heel } from '../../../images/images'

class List extends Component {
    constructor(props) {
        super(props);		

        this.state = {
            scrollEnabled: true
        }				        
    }

    render() {        
        if (this.props.data.length > 0) {
            return (
                <View style={styles.mainView}>            
                    <FlatList
                        style={styles.listView}                   
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
                        onEndReached={() => {
                            if (this.props.data != undefined && this.props.getMore != undefined) {
                                this.props.getMore(this.props.data.length)
                            }
                            return true
                        }}
                        onEndReachedThreshold={0.5}
                        refreshing={false}
                        onRefresh={() => {                            
                            this.props.getRecent()
                        }}                        
                    />
              </View>
            );      
        } else {
            return (
                <NoContent
                    image={heel}
                    text="No posts here!"
                />
            )
        }     
    }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: '#fff'
    },
    listView: {
		flex: 1,		
    }
});

export default List