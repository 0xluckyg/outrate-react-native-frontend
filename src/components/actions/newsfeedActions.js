import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SERVER, RATE, LOCAL_SERVER, GET_RECENT_POSTS, GET_TRENDING_POSTS} from '../../helper/constants'
import {store} from '../../store'
import * as indicatorActions from './indicatorActions';
import { Actions } from 'react-native-router-flux'

export const getRecentPosts = (skip) => {
    return dispatch => {                        
        user_id = store.getState().profile.self.user_id
        queryString = `${skip}-${user_id}`
        axios.get(LOCAL_SERVER+'/post/'+queryString).then(res => {            
            if (res.data.success) {
                dispatch(resolveGetRecentPosts(res.data.data))                
            }            
        })
    }
}

export const getTrendingPosts = (skip) => {
    return dispatch => {        
        user_id = store.getState().profile.self.user_id
        queryString = `${skip}-${user_id}`                
        axios.get(LOCAL_SERVER+'/post/'+queryString).then(res => {                        
            if (res.data.success) {                
                dispatch(resolveGetTrendingPosts(res.data.data))                
            }        
        })
    }
}

export const ratePost = (post_id, value) => {
    console.log('RATE CALL')
    return dispatch => {
        axios.post(LOCAL_SERVER+'/post/rate/'+post_id, {
            rating: value,
            user_id: user_id = store.getState().profile.self.user_id
        }).then(res => {
            console.log('rateSuccess',res)
            if (res.data.success) {
                store.dispatch(indicatorActions.showToast(true))                                
                dispatch(resolveRating(post_id, value))
            }  else {
                console.log('rate error',res.data.message);
            }
        })
    }
}

export const resolveGetRecentPosts = (posts) => {
    return {
        type: GET_RECENT_POSTS,
        posts: posts
    }
}

export const resolveGetTrendingPosts = (posts) => {
    return {
        type: GET_TRENDING_POSTS,
        posts: posts
    }
}

export const resolveRating = (post_id, value) => {
    return {
        type: RATE,
        post: post_id        
    }
}