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
import { connect } from 'react-redux';
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
            "tag1", "tag2", "tagLong3", "tag4", "tag5", "tag6", "tagLong7", "tagLong8", "tag9", "tagLong10"
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
            "tag1", "tag2", "tagLong3", "tag4", "tag5", "tag6", "tagLong7", "tagLong8", "tag9", "tagLong10"
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
            "tag1", "tag2", "tagLong3", "tag4", "tag5", "tag6", "tagLong7", "tagLong8", "tag9", "tagLong10"
        ]
    }
]
import { Actions } from 'react-native-router-flux';

class List extends Component {
    constructor(props) {
        super(props);		
				        
    }
    
    render() {
        return (
            <View style={styles.mainView}>
                <FlatList                                   
                    data={mockData}
                    renderItem={({item}) => {                             
                        return <Post 
                            data={item}
                            ratable={false}
                            goToOnPress={Actions.post}
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