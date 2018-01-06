import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
    Dimensions,
    FlatList,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import {AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import Cell from '../../reusables/cell'
import Tags from '../../reusables/tags'
import Lightbox from 'react-native-lightbox';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'
import { Actions } from 'react-native-router-flux'
import {
	settings
} from '../../../images/images';
import FastImage from 'react-native-fast-image'
import * as profileActions from '../../actions/profileActions'

var width = Dimensions.get('window').width;
const dummyText = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class Me extends Component {
    constructor(props) {
        super(props);	
        
        this.updateName = this.updateName.bind(this)
        this.updateBio = this.updateBio.bind(this)
                        
        this.state = {
            name: this.props.profile.username,
            bio: this.props.profile.bio
        }
    }

    updateName(event) {
        let username = event.nativeEvent.text
        this.props.updateUser({username})
    }
    
    updateBio(event) {
        let bio = event.nativeEvent.text
        this.props.updateUser({bio})
    }


    render() {        
        return (
            <KeyboardAwareScrollView                 
                style={styles.mainView}   
                keyboardOpeningTime={20}   
                // viewIsInsideTabBar={true}          
                extraHeight={100}
            >     
                <Lightbox>
                <View style={styles.imageView}>
                    <FastImage
                        style={styles.image} 
                        source={{
                            uri:this.props.profile.profile,
                            priority: FastImage.priority.normal
                        }}>
                    </FastImage>
                    <View style={styles.imageFooter}>
                        <TextInput 
                            style={styles.name}
                            placeholder="What's your name?"
                            value={this.state.name}
                            onChangeText={currentText => {                            
                                this.setState({name:currentText})
                            }}
                            onSubmitEditing={this.updateName}
                        />                                                
                    </View>
                </View>
                </Lightbox>
                <View style={styles.profileContent}>
                    <Text style={styles.bioHeader}>About Me</Text>
                    <View style={styles.divider}/>
                    <TextInput
                        style={styles.bioContent}
                        placeholder='Talk about yourself!'
                        multiline={true}
                        returnKeyType={"done"}
                        value={this.state.bio}
                        onChangeText={currentText => {                            
                            this.setState({bio:currentText})
                        }}
                        onSubmitEditing={event => {
                            this.updateBio(event)
                            Keyboard.dismiss()
                        }}
                    />
                </View>
                <TouchableOpacity onPress={Actions.settings}>
                    <Image 
                        style={styles.settingsButton}
                        source={settings}
                    />
                </TouchableOpacity>
             </KeyboardAwareScrollView>
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
        textAlign: 'center',
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
        marginBottom: 20,
        marginTop: 25
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: width * 0.5,
        marginBottom: 20
    },
    bioContent: {
        textAlign: 'center',
        fontWeight: '200',
        height: 70,
        marginBottom: 20,
        width: width * 0.7,        
    },
    settingsButton: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end',
        marginBottom: 5,
        marginRight: 5,
    }
});

const mapStateToProps = (state) => (
	{
        profile: state.profile.self,        
	}
)

export default connect(mapStateToProps, profileActions)(Me);