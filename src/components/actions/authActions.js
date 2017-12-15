import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SET_SELF, SERVER} from '../../helper/constants'
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
                        firstLastName = firstLastName(info.data.name)
                        cleanInfo = {                                             
                            profile: pic.data.data.url,
                            first: firstLastName[0],
                            last: firstLastName[1],
                            email: info.data.email
                        }                                             
                        axios.post(SERVER+'/user/'+info.data.id, cleanInfo).then(res => {                            
                            console.log('auth', res)
                            if (res.data.success) {                                                                
                                store.dispatch(indicatorActions.showToast(true))                                
                                Actions.tab()   
                                dispatch(resolveAuth({...cleanInfo,...{user_id:info.data.id}}))                                
                            } else {
                                console.log(res.data.message)
                            }                            
                        })                          
                    })
                })
                // this.props.onLogin && _this.props.onLogin();
            } else {
                console.log(error, data);
            }
        });
    }
}

function firstLastName(name) {    
    if (name.indexOf(' ') >= 0) {
        name = name.split(' ')
    }
    return name
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