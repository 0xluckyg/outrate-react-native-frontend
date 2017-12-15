import { SET_SELF,SET_MY_POSTS } from '../../helper/constants'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

const initialState = {
    self: {}    
}

export default function (state = initialState, action) {                
    switch (action.type) {
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