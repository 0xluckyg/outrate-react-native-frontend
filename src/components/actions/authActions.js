import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SET_SELF, SERVER} from '../../helper/constants'
import {store} from '../../store'
// import * as indicatorActions from './indicatorActions';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login'
import { Actions } from 'react-native-router-flux'

export const facebookAuth = (userInfo) => {

    return dispatch => {
        FBLoginManager.login(function(error, data){
            if (!error) {                
                console.log('logindata', data)
                Actions.tab()
                // this.setState({ user : data});
                // this.props.onLogin && _this.props.onLogin();
            } else {
                console.log(error, data);
            }
        });
    }

    // store.dispatch(indicatorActions.showSpinner(true));
    // return dispatch => {        
    //     axios.post(`${SERVER}/signup`, userInfo, {
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         },
    //     }).then(res => dispatch(resolveAuth(res)))
    //     .catch(err => {            
    //         store.dispatch(indicatorActions.showSpinner(false));
    //         store.dispatch(indicatorActions.showToast(err.response.data));             
    //         return;
    //     });
    // }
}

export const resolveAuth = (res) => {        
    return {
        type: CONNECT_SOCKET,
        self: {...res.data, token}
    }
}

export const connectWithToken = (data) => {
    return {
        type: CONNECT_SOCKET,
        self: {_id: data.id, token: data.token}
    }
}