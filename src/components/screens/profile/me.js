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
import {AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import {
	mock1,
} from '../../../images/images';
import Cell from '../../reusables/cell'
import Tags from '../../reusables/tags'
import Lightbox from 'react-native-lightbox';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'
import { Actions } from 'react-native-router-flux'

var width = Dimensions.get('window').width;
const dummyText = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when"

class Me extends Component {
    constructor(props) {
        super(props);		
				        
    }
    
    render() {
        return (
            <View style={styles.mainView}>
                <Lightbox>
                <View style={styles.imageView}>
                    <Image style={styles.image} source={{uri:this.props.profile.profile}}></Image>
                    <View style={styles.imageFooter}>
                        <Text style={styles.name}>{
                            `${this.props.profile.username}`
                        }</Text>
                    </View>                    
                </View>
                </Lightbox>
                <View style={styles.profileContent}>                    
                    <Text style={styles.bioHeader}>BIO</Text>
                    <View style={styles.divider}/>
                    <Text style={styles.bioContent}>{dummyText}</Text>
                </View>
                <TouchableOpacity onPress={Actions.settings}>
                    <Image>
                        
                    </Image>
                </TouchableOpacity>
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
        width: width,
        height: width * 0.9,
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    imageFooter: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: width,
        height: 50,        
        justifyContent: 'center',
        alignItems: 'center', 
        bottom: 0
    },
    name: {
        marginLeft: 20,
        fontSize: 25,
        fontWeight: '200',
        color: 'white'
    },
    profileContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'       
    },
    bioHeader: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '200',
        marginBottom: 20
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        width: width * 0.5,
        marginBottom: 20
    },
    bioContent: {
        textAlign: 'center',
        fontWeight: '200',        
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 40     
    }   
});

const mapStateToProps = (state) => (
	{
        profile: state.profile.self,        
	}
)

export default connect(mapStateToProps, null)(Me);