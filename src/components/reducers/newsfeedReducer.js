import {GET_TRENDING_POSTS, GET_RECENT_POSTS, RATE } from '../../helper/constants'

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
            // console.log('ratine before',state.recentPosts)
            // state.recentPosts = changeRating(state.recentPosts, action.newPost)
            // state.trendingPosts = changeRating(state.trendingPosts, action.newPost)
            // console.log('ratine update',state.recentPosts)
            return {
                ...state
            }
        default:
            return state
    }
}