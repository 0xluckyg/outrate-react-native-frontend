import { SET_SELF,SET_MY_POSTS,UPDATE_SELF } from '../../helper/constants'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

const initialState = {
    self: {}    
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
            // state.self.posts = action.posts
            console.log('ye',state)            
            return {
                ...state,
                self: {
                    ...state.self,
                    posts: action.posts
                }
            }
        default:
            return state
    }
}