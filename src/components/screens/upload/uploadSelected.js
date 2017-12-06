import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
    Text,
    Image,
    Dimensions,    
    ImageBackground,    
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import {
	back
} from '../../../images/images';
import { Actions } from 'react-native-router-flux'
import {AppColors} from '../../../helper/style'
import Tags from '../../reusables/tags'
import Post from '../../reusables/post'
import * as uploadActions from '../../actions/uploadActions';

var width = Dimensions.get('window').width;

const Header = ({headerText}) => {
    return(
        <View style={styles.navStyle}>
            <TouchableOpacity style={styles.back} onPress={() => Actions.pop()}>
                <Image style={styles.backImage} source={back}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>{headerText}</Text>                        
        </View>
    )
}


class UploadSelected extends Component {
    constructor(props) {
        super(props);		
                
        this.state = {
            tags: [],
            currentTag: ''
        }

        this.tagExists = this.tagExists.bind(this)
        
    }

    tagExists(check) {
        this.state.tags.map(tag => {            
            if (tag.name.localeCompare(check)) {                
                console.log('ch',tag)            
                console.log('check',check)
                return true
            }
        })
        return false
    }
    
    render() {  
        console.log('onRender', this.state.currentTag)
        return (
            <KeyboardAvoidingView 
                behavior='padding'            
                style={styles.mainView}                
            >     
                <Header headerText='Ready to go!'/>                
                <TouchableWithoutFeedback 
                    style={styles.mainView}
                    onPress={Keyboard.dismiss}
                >
                    <View>
                    <View style={styles.imageView}>                                            
                        <ImageBackground style={styles.image} source={{uri:this.props.image}}>
                            <TouchableOpacity 
                                style={styles.imageFooter}
                                onPress={() => {
                                        this.props.uploadPost(
                                            this.props.image, 
                                            this.props.self.user_id,
                                            this.state.tags
                                        )
                                    }
                                }
                            >                                
                                <Text style={styles.uploadButton}>UPLOAD!</Text>                                
                            </TouchableOpacity>               
                        </ImageBackground>                                            
                    </View>
                    <TextInput
                        ref={component => this._textInput = component}                              
                        placeholder='Enter a tag! Maybe a brand?'
                        value={this.state.currentTag}
                        style={styles.tagInput}
                        onChangeText={currentTag => {
                            console.log('textChangeCalled', this.state.currentTag)
                            this.setState({currentTag})
                        }}
                        onSubmitEditing={(event) => {                            
                            tags = this.state.tags
                            if (!this.tagExists(this.state.currentTag)){                                
                                tags.push({name:event.nativeEvent.text})                                
                                this.setState({tags})
                                this._textInput.setNativeProps({text: ''});                                
                            }                                          
                            event.nativeEvent.text = ''                                          
                        }}
                        value={this.state.text}
                    />
                    <Tags tags={this.state.tags}/>            
                    </View>
                </TouchableWithoutFeedback>
			</KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        width: width,
        backgroundColor:'#fff',      
    },
    navStyle:{  
        marginTop: 20,
        backgroundColor:'#fff',      
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        height:40,        
        borderBottomWidth: 0.5,
        borderColor: AppColors.appGray,        
    },
    back:{
        position: 'absolute',
        left: 10,                
    },
    backImage:{
        height: 25,
        width: 25,        
    },
    title:{
        fontSize:20,
        position: 'absolute',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        flex: 1
    },
    imageView: {        
        width: width,
        height: width * 0.9,
    },
    image: {
        flex: 1,          
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },    
    imageFooter: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 50,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },        
    uploadButton: {
        fontWeight: '200',
        paddingRight: 7,
        paddingLeft: 7,
        paddingTop: 4,
        paddingBottom: 4,
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        borderColor: 'white',
        borderWidth: 1,
        margin: 7,
        marginLeft: 15
    },
    tagInput: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        height: 40, 
        borderColor: 'gray', 
        borderBottomWidth: 1
    }
});

const mapStateToProps = (state) => (
	{
		self: state.profile.self
	}
)

export default connect(mapStateToProps, uploadActions)(UploadSelected);