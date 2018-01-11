import {GET_TRENDING_POSTS, GET_RECENT_POSTS, RATE, LOG_OUT, GET_RECENT_RECENT_POSTS } from '../../helper/constants'

const initialState = {
    recentPosts: [],
    trendingPosts: []
}

function insertItem(array, action) {
    return [
        ...array.slice(0, action.index),
        action.item,
        ...array.slice(action.index)
    ]
}

function removeItem(array, action) {
    return [
        ...array.slice(0, action.index),
        ...array.slice(action.index + 1)
    ];
}


function changeRating(posts, updatedPost) {
    console.log('change rating',updatedPost)
    let index = posts.findIndex(elm => {
        return elm._id === updatedPost._id
    })
    console.log('index',index);
    posts[index] = updatedPost
    return posts
}

export default function (state = initialState, action) {     
    switch (action.type) {
        case GET_RECENT_POSTS:    
            let recentPosts = state.recentPosts
            if (action.skip > 0) {
                recentPosts.splice(recentPosts.length, 0, ...action.posts)
            } else {
                recentPosts = action.posts
            }            
            return {        
                ...state,      
                recentPosts
            }       
        case GET_RECENT_RECENT_POSTS:
            recentPosts = state.recentPosts            
            if (action.sliced) {
                recentPosts = action.posts
            } else {
                recentPosts = action.posts.concat(recentPosts)                
            }
            return {
                ...state,
                recentPosts
            }
        case GET_TRENDING_POSTS:                 
            trendingPosts = action.posts            
            return {           
                ...state,     
                trendingPosts
            }   
        case RATE:
            // console.log('ratine before',state.recentPosts)
            // state.recentPosts = changeRating(state.recentPosts, action.newPost)
            // state.trendingPosts = changeRating(state.trendingPosts, action.newPost)
            // console.log('ratine update',state.recentPosts)
            return {
                ...state
            }
        case LOG_OUT:
            return {
                ...state,
                recentPosts: [],
                trendingPosts: []
            }
        default:
            return state
    }
}