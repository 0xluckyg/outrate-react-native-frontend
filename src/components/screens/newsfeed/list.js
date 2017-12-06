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
import {
	mock1,
	mock2,
    mock3,
} from '../../../images/images';
import Post from '../../reusables/post'

const mockData = [
    {
        _id: 'id1',
        header: {            
            image: mock1,
            name: {
                first: 'First1',
                last: 'Last1'
            }
        },        
        image: {
            image: mock1
        },
        tags: [
            {name: 'tag1'},
            {name: 'tag2'},
            {name: 'tag3'},
            {name: 'tag4'},
            {name: 'tag5'},
            {name: 'tag6'},
            {name: 'tag7'},
            {name: 'tag8'},
            {name: 'tag9'},
            {name: 'tag10'}
        ]
    },
    {
        _id: 'id2',
        header: {            
            image: mock2,
            name: {
                first: 'First2',
                last: 'Last2'
            }
        },
        image: {
            image: mock2
        },
        tags: [
            {name: 'tag1'},
            {name: 'tag2'},
            {name: 'tag3'},
            {name: 'tag4'},
            {name: 'tag5'},
            {name: 'tag6'},
            {name: 'tag7'},
            {name: 'tag8'},
            {name: 'tag9'},
            {name: 'tag10'}
        ]
    },
    {
        _id: 'id3',
        header: {            
            image: mock3,
            name: {
                first: 'First3',
                last: 'Last3'
            }
        },
        image: {
            image: mock3
        },
        tags: [
            {name: 'tag1'},
            {name: 'tag2'},
            {name: 'tag3'},
            {name: 'tag4'},
            {name: 'tag5'},
            {name: 'tag6'},
            {name: 'tag7'},
            {name: 'tag8'},
            {name: 'tag9'},
            {name: 'tag10'}
        ]
    }
]
import { Actions } from 'react-native-router-flux';

class List extends Component {
    constructor(props) {
        super(props);		

        this.state = {
            scrollEnabled: true
        }				        
    }

    render() {
        console.log('thspor', this.props.data)
        return (
            <View style={styles.mainView}>
                <FlatList                   
                    scrollEnabled={this.state.scrollEnabled}                
                    data={this.props.data}
                    renderItem={({item}) => {                             
                        console.log('wheremyitme', item)
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