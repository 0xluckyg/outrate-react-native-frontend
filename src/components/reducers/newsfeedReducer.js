import {GET_TRENDING_POSTS, GET_RECENT_POSTS } from '../../helper/constants'

const initialState = {
    recentPosts: [],
    trendingPosts: []
}

export default function (state = initialState, action) { 
    console.log('where?!', action)       
    switch (action.type) {
        case GET_RECENT_POSTS:            
            return {        
                ...state,        
                recentPosts: action.posts
            }   
        case GET_TRENDING_POSTS:            
            return {           
                ...state,     
                trendingPosts: action.posts
            }   
        default:
            return state
    }
}