import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SERVER, LOCAL_SERVER, SET_SELF} from '../../helper/constants'
import {store} from '../../store'
import * as indicatorActions from './indicatorActions';
import { Actions } from 'react-native-router-flux'

export const getUser = () => {    
    return dispatch => {
        let user_id = store.getState().profile.self.user_id
        axios.get(LOCAL_SERVER+'/user/'+user_id)
        .then((res) => {
            if (res.data.success) {                
                dispatch(resolveGetUser(res.data.data))
            }            
        })
    }
}

export const followUser = (to_follow) => {
    return dispatch => {        
        let user_id = store.getState().profile.self.user_id
        axios.post(LOCAL_SERVER+'/user/follow/'+user_id, {to_follow})
        .then((res) => {
            if (res.data.success) {
                getUser()
                store.dispatch(indicatorActions.showToast(true))
            }
        })
    }
}

export const unfollowUser = (to_unfollow) => {
    return dispatch => {        
        let user_id = store.getState().profile.self.user_id
        axios.post(LOCAL_SERVER+'/user/unfollow/'+user_id, {to_unfollow})
        .then((res) => {
            if (res.data.success) {                                
                store.dispatch(indicatorActions.showToast(true))
            }
            console.log(res)
        })
    }
}

export const resolveGetUser = (user) => {
    return {
        type: SET_SELF,
        self: user
    }
}
