import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SERVER, SET_SELF,SET_MY_POSTS, UPDATE_SELF, UPDATE_MY_POSTS} from '../../helper/constants'
import {store} from '../../store'
import * as indicatorActions from './indicatorActions';
import { Actions } from 'react-native-router-flux'

export const getUser = (user_id) => {     

    return dispatch => {      
        if (user_id == undefined) {
            user_id = store.getState().profile.self.user_id   
        }        
        console.log(user_id)
        axios.get(SERVER+'/user/'+user_id)
        .then((res) => {
            console.log('why no res', res)
            if (res.data.success) {                           
                dispatch(resolveGetUser(res.data.data))
            }                        
        })
    }
}

export const getUserPosts = (skip) => {          
    return dispatch => {                
        let user_id = store.getState().profile.self.user_id
        queryString = `${skip}-${user_id}`          
        axios.get(SERVER+'/post/user/'+queryString)
        .then((res) => { 
            if (res.data.success) {                                                
                dispatch(resolveGetMyPosts(res.data.data))                
            }                                   
        })                  
    }
}

export const followUser = (to_follow) => {
    return dispatch => {        
        let user_id = store.getState().profile.self.user_id
        axios.post(SERVER+'/user/follow/'+user_id, {to_follow})
        .then((res) => {
            if (res.data.success) {                
                store.dispatch(getUser())
                store.dispatch(indicatorActions.showToast(true))
            }
        })
    }
}

export const unfollowUser = (to_unfollow) => {
    return dispatch => {        
        let user_id = store.getState().profile.self.user_id
        axios.post(SERVER+'/user/unfollow/'+user_id, {to_unfollow})
        .then((res) => {
            if (res.data.success) {    
                store.dispatch(getUser())                            
                store.dispatch(indicatorActions.showToast(true))
            }            
        })
    }
}

export const updateUser = (info) => {
    return dispatch => {                
        let user_id = store.getState().profile.self.user_id
        console.log('update user', user_id)
        axios.put(SERVER+'/user/update/'+user_id, info)
        .then((res) => {
            console.log('update user', res)
            if (res.data.success) {                    
                store.dispatch(indicatorActions.showToast(true))
                dispatch(resolveUpdateUser(res.data.data))
            }            
        })
    }
}

export const updatePost = (post_id, user_id, tags) => {
    return dispatch => {                
        console.log('update data', post_id, user_id, tags)
        axios.put(SERVER+'/post/update/'+post_id, {user_id, tags})
        .then((res) => {
            console.log('update post', res)
            if (res.data.success) {                         
                store.dispatch(indicatorActions.showToast(true))
                store.dispatch(resolveUpdatePost(res.data.data))
            }            
        })
    }
}

export const resolveGetMyPosts = (posts) => {
    return {
        type: SET_MY_POSTS,
        posts
    }
}

export const resolveGetUser = (user) => {
    return {
        type: SET_SELF,
        self: user
    }
}

export const resolveUpdateUser = (user) => {
    return {
        type: UPDATE_SELF,
        self: user
    }
}

export const resolveUpdatePost = (post) => {
    return {
        type: UPDATE_MY_POSTS,
        post
    }
}
