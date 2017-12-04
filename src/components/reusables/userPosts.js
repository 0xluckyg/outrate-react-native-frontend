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

const mockData = [
    {
        _id: 'id1',        
        image: {
            image: mock1
        }
    },
    {
        _id: 'id2',
        image: {
            image: mock2
        }        
    },
    {
        _id: 'id3',
        image: {
            image: mock3
        }        
    },
    {
        _id: 'id4',        
        image: {
            image: mock1
        }
    },
    {
        _id: 'id5',
        image: {
            image: mock2
        }        
    },
    {
        _id: 'id6',
        image: {
            image: mock3
        }        
    },
    {
        _id: 'id7',        
        image: {
            image: mock1
        }
    },
    {
        _id: 'id8',
        image: {
            image: mock2
        }        
    },
    {
        _id: 'id9',
        image: {
            image: mock3
        }        
    },
    {
        _id: 'id10',        
        image: {
            image: mock1
        }
    },
    {
        _id: 'id11',
        image: {
            image: mock2
        }        
    },
    {
        _id: 'id12',
        image: {
            image: mock3
        }        
    }
]

const Cell = ({data}) => {    
    return (
        <View>                        
            <Image style={styles.image} source={data.image.image}></Image>                        
        </View>
    );
}

class Posts extends Component {
    constructor(props) {
        super(props);		
				        
    }
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList    
                    style={styles.list}                               
                    data={mockData}
                    renderItem={({item}) => {                        
                        return             <Image style={styles.image} source={item.image.image}></Image>
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