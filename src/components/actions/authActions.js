import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SET_SELF, SERVER, LOG_OUT} from '../../helper/constants'
import {store} from '../../store'
import * as indicatorActions from './indicatorActions';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'
import { Actions } from 'react-native-router-flux'

const FB_PHOTO_WIDTH = 400;

export const facebookAuth = (userInfo) => {    
    return dispatch => {
        FBLoginManager.login(function(error, data){            
            if (!error) {                
                user = data.credentials                                                        
                var picture = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;
                var userInfo = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;
                
                axios.get(picture).then(pic => {                    
                    axios.get(userInfo).then(info => {     
                        console.log('fb',info)
                        cleanInfo = {                                             
                            profile: pic.data.data.url,
                            username: info.data.name,
                            email: info.data.email
                        }
                        axios.post(SERVER+'/user/'+info.data.id, cleanInfo).then(res => {                                                                                                                         
                            console.log('auth', res)
                            if (res.data.success) {                                                                
                                store.dispatch(indicatorActions.showToast(true))                                
                                AsyncStorage.setItem('id', info.data.id).then(() => {
                                    dispatch(resolveAuth(res.data.data))
                                    Actions.tab()                                   
                                })                                                                    
                            } else {
                                console.log(res.data.message)
                            }                            
                        })                          
                    }).catch(err => {
                        console.log(err)
                    })
                })
                // this.props.onLogin && _this.props.onLogin();
            } else {
                console.log(error, data);
            }
        });
    }
}

export const logOut = () => {
    return dispatch => {
        FBLoginManager.logout(function(error, data){
            if (!error) {
                AsyncStorage.removeItem('id').then(() => {
                    Actions.auth()
                    dispatch(resolveLogOut())                    
                })                            
            } else {
                console.log(error)
            }
        });
    }
}

export const resolveLogOut = (res) => {
    return {
        type: LOG_OUT
    }
}


export const resolveAuth = (res) => {        
    return {
        type: SET_SELF,
        self: res
    }
}

export const connectWithToken = (data) => {
    return {
        type: SET_SELF,
        self: {_id: data.id, token: data.token}
    }
}