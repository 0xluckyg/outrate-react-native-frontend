import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    Text,
    Image
} from 'react-native';
import {x} from '../../images/images'

const Tag = ({tag, deleteTag, editable}) => {    

    const formatTag = (tag) => {
        if (tag.length > 10) {
            tag = tag.substring(0, 9) + '..'            
        }
        return tag
    }    
    return (        
        <View style={styles.bubble}>
            <Text style={styles.tag}>{formatTag(tag)}</Text>                        
            {editable ? 
                <TouchableOpacity
                    onPress={() => {                        
                        deleteTag(tag)
                    }}
                >
                    <Image style={styles.xStyle} source={x}/>
                </TouchableOpacity>
                : 
                null
            }            
        </View>
    );
};

class Tags extends Component {
    constructor(props) {
        super(props);	
        this.returnTag = this.returnTag.bind(this)	        
    }

    returnTag() {
        let counter = 0        
        return this.props.tags.map(tag => {
            counter++            
            return (                 
                <Tag 
                    key={counter} 
                    tag={tag.name}
                    deleteTag={this.props.deleteTag}
                    editable={this.props.editable}
                /> )
        })
    }
    
    render() {
        return (
			<View style={styles.mainView}>                
                {
                    this.returnTag()
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    tag: {        
        fontSize: 12,
        fontWeight: "100",
        marginLeft: 7,
        marginRight: 5,
        marginTop: 2,
        marginBottom:2 
    },
    xStyle: {
        height: 12,
        width: 12,
        marginRight: 5
    }
});

export default Tags