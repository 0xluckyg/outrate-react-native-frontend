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
    mock3,
    minus
} from '../../../images/images';
import Cell from '../../reusables/cell'
import Tags from '../../reusables/tags'

var width = Dimensions.get('window').width;

const mockData = [
    {
        _id: 'id1',            
        image: mock1,
        name: {
            first: 'First1',
            last: 'Last1'
        }        
    },
    {
        _id: 'id2',           
        image: mock2,
        name: {
            first: 'First2',
            last: 'Last2'
        }        
    },
    {
        _id: 'id3',            
        image: mock3,
        name: {
            first: 'First3',
            last: 'Last3'
        }
    },
    {
        _id: 'id4',                  
        image: mock1,
        name: {
            first: 'First1',
            last: 'Last1'
        }        
    },
    {
        _id: 'id5',        
        image: mock2,
        name: {
            first: 'First2',
            last: 'Last2'
        }        
    },
    {
        _id: 'id6',             
        image: mock3,
        name: {
            first: 'First3',
            last: 'Last3'
        }    
    },
    {
        _id: 'id7',                
        image: mock1,
        name: {
            first: 'First1',
            last: 'Last1'
        } 
    }
]

const Post = ({data}) => {    
    return (        
        <Cell 
            height={60}
            data={data}
            buttons={[
                { image: minus },                
            ]}
        />                    
    );
}

class Follows extends Component {
    constructor(props) {
        super(props);		
				        
    }
    
    render() {
        return (
            <View style={styles.mainView}>
                <FlatList                                   
                    data={mockData}
                    renderItem={({item}) => {                        
                        return <Post data={item}/>
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

export default Follows