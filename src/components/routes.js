import React, {Component} from 'react';
import {Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {AppColors} from '../helper/style';
import * as profileActions from './actions/profileActions';
import {store} from '../store'
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';

import Auth from './screens/auth';
import Photo from './screens/photo';
import Newsfeed from './screens/newsfeed/newsfeed';
import PostView from './screens/postView';
import Upload from './screens/upload/upload';
import UploadSelected from './screens/upload/uploadSelected';
import Profile from './screens/profile/profile';
import Settings from './screens/settings';

import {
    back,
    camera,
    cameraSelected,
    cloth,
    clothSelected,
    profile,
    profileSelected    
} from '../images/images';

import { Actions } from 'react-native-router-flux'
import {SERVER, SET_SELF,SET_MY_POSTS} from '../helper/constants'
import axios from 'axios';

const TabIcon = ({focused, title}) => {    
    let tabBarImage; let selectedTabBarImage;
    switch(title) {
        case 'newsfeedTab':
            tabBarImage = cloth; selectedTabBarImage = clothSelected; break;
        case 'uploadTab':
            tabBarImage = camera; selectedTabBarImage = cameraSelected; break;
        case 'profileTab':
            tabBarImage = profile; selectedTabBarImage = profileSelected; break;        
    }

    if (focused) {        
        return <Image style={styles.tabImageSelected} source={selectedTabBarImage}/>
    }
    return <Image style={styles.tabImage} source={tabBarImage}/>
}

class RouterComponent extends Component {
    constructor() {
        super();

        this.state = {            
            loading: true,
            isLoggedIn: false
        }
    }

    getUser() {
        axios.get(SERVER+'/user/'+user_id)
        .then((res) => {            
            if (res.data.success) {                           
                
            }                        
        })
    }

    componentWillMount() {           
        AsyncStorage.getItem('id').then(id => {            
            if (id) {
                axios.get(SERVER+'/user/'+id)
                .then((res) => {            
                    if (res.data.success) {                           
                        this.setState({isLoggedIn: true, loading: false});
                        store.dispatch(profileActions.resolveGetUser(res.data.data))
                    } else { 
                        this.setState({loading: false});
                    }                        
                })                
            } else {
                this.setState({loading: false});
            }            
        })                       
    };

    render() {
        if (this.state.loading) {
            return (
                <ActivityIndicator/>
            );
        }

        return(
            <Router>
                <Stack
                    key='root'            
                    hideNavBar    
                >   
                    <Scene 
                        key='auth' 
                        component={Auth}                         
                        hideNavBar
                        initial={this.state.isLoggedIn}
                    />
                    <Scene                    
                        key='tab'
                        tabBarStyle={styles.footerStyle} 
                        showLabel={false}
                        hideNavBar    
                        initial={this.state.isLoggedIn}
                        tabs                                                
                    >         
                        <Scene key='newsfeedTab' title='newsfeedTab' icon={TabIcon}>               
                            <Scene
                                    key='newsfeed'
                                    component={Newsfeed}                                    
                                    titleStyle={styles.headerFontStyle}
                                    sceneStyle={styles.sceneStyle}
                                    title='Newsfeed'                                                                                                
                            />
                        </Scene>
                        <Scene key='uploadTab' title='uploadTab' icon={TabIcon}>               
                            <Scene
                                    key='upload'
                                    hideNavBar
                                    component={Upload}                                                                    
                                    sceneStyle={styles.sceneWithoutTabbarStyle}
                                    title='Upload'                                                                    
                            />
                            <Scene
                                    key='uploadSelected'
                                    component={UploadSelected}                                                                                                        
                                    sceneStyle={styles.sceneStyle}
                                    hideNavBar                                
                            />
                        </Scene>
                        <Scene key='profileTab' title='profileTab' icon={TabIcon}>               
                            <Scene
                                    key='profile'
                                    component={Profile}
                                    hideNavBar
                                    navigationBarStyle={styles.headerStyle}
                                    titleStyle={styles.headerFontStyle}
                                    sceneStyle={styles.sceneWithoutTabbarStyle}
                                    title='Profile'                                                                    
                            />
                            <Scene
                                    key='settings'
                                    component={Settings}                                    
                                    navigationBarStyle={styles.headerStyle}
                                    titleStyle={styles.headerFontStyle}
                                    sceneStyle={styles.sceneWithoutTabbarStyle}
                                    title='Settings'                                                                    
                            />
                        </Scene>
                    </Scene>
                </Stack>     
            </Router>
        )
    }
}

const styles = {
    authHeaderStyle: {
        height:60,
        borderBottomColor: 'transparent',
        backgroundColor: 'transparent'
    },
    backButtonStyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        tintColor: 'white'
    },
    headerStyle: {
        height:45,
        borderBottomWidth: 0.5,
        borderBottomColor: AppColors.appGray,
        backgroundColor:'#fff',
    },
    headerFontStyle: {
        fontSize: 20,
        fontWeight: '200'
    },
    sceneStyle: {
        paddingTop: 60,
        paddingBottom: 45.5
    },
    sceneWithoutTabbarStyle: {
        paddingTop: 60
    },
    footerStyle: {
        height: 45,
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderTopColor: AppColors.appGray
    },
    tabImage: {
        resizeMode: 'contain',
        height: 22,
        tintColor: AppColors.appGray
    },
    tabImageSelected: {
        resizeMode: 'contain',
        height: 20,
        tintColor: 'black'
    }
}


export default RouterComponent

