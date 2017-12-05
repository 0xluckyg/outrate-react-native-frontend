import {GET_TRENDING_POSTS, GET_RECENT_POSTS } from '../../helper/constants'

const initialState = {
    recentPosts: [],
    trendingPosts: []
}

export default function (state = initialState, action) {        
    switch (action.type) {
        case GET_RECENT_POSTS:            
            return {                
                recentPosts: action.posts
            }   
        case GET_TRENDING_POSTS:            
            return {                
                trendingPosts: action.posts
            }   
        default:
            return state
    }
}