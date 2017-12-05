import React, {Component} from 'react';
import {Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {AppColors} from '../helper/style';

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

// import {store} from '../store';

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
        console.log('selected')
        return <Image style={styles.tabImageSelected} source={selectedTabBarImage}/>
    }
    return <Image style={styles.tabImage} source={tabBarImage}/>
}

class RouterComponent extends Component {
    constructor() {
        super();

        this.state = {            
            loading: true
        }
    }

    componentWillMount() {  
        // Auth logic goes here
        // AsyncStorage.getItem('token').then(token => {
                     
        // });

        this.setState({loading: false});
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
                    />
                    <Scene                    
                        key='tab'
                        tabBarStyle={styles.footerStyle}
                        showLabel={false}
                        hideNavBar    
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


export default RouterComponent;

