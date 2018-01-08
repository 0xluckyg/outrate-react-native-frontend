import { SET_SELF,SET_MY_POSTS,UPDATE_SELF, UPDATE_MY_POSTS, LOG_OUT } from '../../helper/constants'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

const initialState = {
    self: {}    
}

function findPostAndUpdate(posts, post) {
    for (i = 0; i < posts.length; i ++) {
        postToUpdate = posts[i]
        if (postToUpdate._id === post._id) {
            posts[i] = post
            break
        }
    }
    return posts
}

export default function (state = initialState, action) {                
    switch (action.type) {
        case UPDATE_SELF:
            let posts = state.self.posts
            state.self = action.self            
            return {
                ...state,
                self: {
                    ...state.self,
                    posts
                }
            }
        case SET_SELF:                                    
            state.self = action.self                             
            return state
        case SET_MY_POSTS:
            let newPosts = state.self.posts
            // console.log('ye',state)       
            
            if (action.skip > 0) {
                newPosts.splice(newPosts.length, 0, ...action.posts)
            } else {
                newPosts = action.posts
            }

            return {
                ...state,
                self: {
                    ...state.self,
                    posts: newPosts
                }
            }
        case UPDATE_MY_POSTS:
            let updatedPosts = state.self.posts
            if (action.post) {
                let updatedPosts = findPostAndUpdate(newPosts, action.post)
            }

            return {
                ...state,
                self: {
                    ...state.self,
                    posts: updatedPosts
                }
            }
        case LOG_OUT:
            return {
                ...state,
                self: {}
            }
        default:
            return state
    }
}