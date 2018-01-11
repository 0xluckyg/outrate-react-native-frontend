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
    Keyboard,
    FlatList
} from 'react-native';
import Lodash from 'lodash';
import { connect } from 'react-redux';
import {
	back
} from '../../../images/images';
import { Actions } from 'react-native-router-flux'
import {AppColors} from '../../../helper/style'
import {SERVER} from '../../../helper/constants'
import axios from 'axios'
import Tags from '../../reusables/tags'
import Post from '../../reusables/post'
import * as uploadActions from '../../actions/uploadActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
            // tagOptions: [],
            currentTag: ''
        }                

        // this.searchTags = this.searchTags.bind(this)
        // this.renderTagOptions = this.renderTagOptions.bind(this)
    }

    // searchTags(tag) {
    //     axios.get(SERVER+'/tag/search/' + tag).then(res => {            
    //         if (res.data.success) {
    //             console.log('a', res.data)
    //             this.setState({tagOptions: res.data.data})
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    // renderTagOptions() {
    //     if (this.state.tagOptions.length > 0) {
    //         console.log(this.state.tagOptions)
    //         return (                
    //             <FlatList
    //                 style={styles.tagOptions}
    //                 data={this.state.tagOptions}
    //                 renderItem={({item}) => {                                                                         
    //                     return <TouchableOpacity 
    //                                 style={styles.tagOption}
    //                                 onPress={() => {
    //                                     this.setState({
    //                                         tag: this.state.tags.push(item.name),
    //                                         tagOptions: []
    //                                     })
    //                                 }}
    //                             >
    //                                 <Text style={styles.tagOptionText}>
    //                                     {item.name}
    //                                 </Text>          
    //                             </TouchableOpacity>                                    
    //                 }}  
    //                 keyExtractor={(item, index) => index}        
    //             >                    
    //             </FlatList>
    //         )
    //     }
    // }
    
    render() {        
        // const tagSearch = Lodash.debounce((term) => {this.searchTags(term)}, 300);
        
        return (
            <KeyboardAwareScrollView 
                // behavior='padding'            
                style={styles.mainView}   
                keyboardOpeningTime={20}   
                // viewIsInsideTabBar={true}          
                extraHeight={200}
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
                            this.setState({currentTag})
                            // tagSearch(currentTag)
                        }}
                        onSubmitEditing={(event) => {                            
                            tags = this.state.tags
                            flag = false   
                            input = event.nativeEvent.text.toLowerCase()
                            this.state.tags.forEach(tag => {                    
                                if (tag.name === input) {                                 
                                    flag = true
                                    return                     
                                }
                            })                
                            if (!flag) {
                                tags.push({name:input})                                
                                this.setState({
                                    tags,
                                    // tagOptions: []
                                })
                                this._textInput.setNativeProps({text: ''});                                
                            }                                          
                            event.nativeEvent.text = ''
                        }}
                        value={this.state.text}
                    />
                    {/* tag search */}
                    {/* {this.renderTagOptions()} */}
                    <Tags 
                        tags={this.state.tags}  
                        editable={true}
                        deleteTag={(originalTag) => {               
                            index = 0;       
                            for (i = 0; i < this.state.tags.length; i++) {
                                tag = this.state.tags[i]                                                                                            
                                if (tag.name === originalTag) {                                    
                                    break
                                }
                                index++
                            }                            
                            tags = this.state.tags
                            tags.splice(index, 1);
                            this.setState({tags})
                        }}
                    />            
                    </View>
                </TouchableWithoutFeedback>
			</KeyboardAwareScrollView>
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
    },
    tagOptions: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,                 
    },
    tagOption: {            
        borderColor: AppColors.appMediumGray, 
        borderBottomWidth: 1
    },
    tagOptionText: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,     
    }
});

const mapStateToProps = (state) => (
	{
        self: state.profile.self        
	}
)

export default connect(mapStateToProps, uploadActions)(UploadSelected);