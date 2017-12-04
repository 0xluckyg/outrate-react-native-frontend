import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    Text
} from 'react-native';

const Tag = (tag) => {

    const formatTag = (tag) => {
        if (tag.length > 10) {
            tag = tag.substring(0, 9) + '..'            
        }
        return tag
    }
        
    return (        
        <View style={styles.bubble}>
            <Text style={styles.tag}>{formatTag(tag.tag)}</Text>
        </View>
    );
};

class Tags extends Component {
    constructor(props) {
        super(props);		        
    }
    
    render() {
        return (
			<View style={styles.mainView}>                
                {
                    this.props.tags.map(tag => {
                        return ( <Tag key={tag} tag={tag}/> )
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
	mainView: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 7,
        marginBottom: 7,		
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    bubble: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    tag: {        
        fontSize: 12,
        fontWeight: "100",
        marginLeft: 7,
        marginRight: 7,
        marginTop: 2,
        marginBottom:2 
    }
});

export default Tags