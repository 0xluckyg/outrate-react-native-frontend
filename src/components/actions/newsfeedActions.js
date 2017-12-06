import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {SERVER, LOCAL_SERVER, GET_RECENT_POSTS, GET_TRENDING_POSTS} from '../../helper/constants'
import {store} from '../../store'
// import * as indicatorActions from './indicatorActions';
import { Actions } from 'react-native-router-flux'
// import {store} from '../../store'

export const getRecentPosts = (uri, user_id, tags) => {
    return dispatch => {                        
        axios.get(LOCAL_SERVER+'/post').then(res => {                                        
            if (res.data.success) {
                dispatch(resolveGetRecentPosts(res.data.data))
                console.log('gotit',res)
            }            
        })
    }
}

export const getTrendingPosts = (uri, user_id, tags) => {
    return dispatch => {                        
        axios.get(LOCAL_SERVER+'/post').then(res => {                        
            if (res.data.success) {
                dispatch(resolveGetTrendingPosts(res.data.data))
                console.log('gotit',res)
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