import {GET_TRENDING_POSTS, GET_RECENT_POSTS, RATE } from '../../helper/constants'

const initialState = {
    recentPosts: [],
    trendingPosts: []
}

function changeRating(state) {
    
}

export default function (state = initialState, action) {     
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
        case RATE:
            return {
                ...state
            }
        default:
            return state
    }
}