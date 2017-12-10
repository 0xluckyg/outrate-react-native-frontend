import { SET_SELF } from '../../helper/constants'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'

const initialState = {
    self: {}    
}

export default function (state = initialState, action) {            
    switch (action.type) {
        case SET_SELF:            
            console.log('self', action)
            Actions.tab()   
            state.self = action.self                             
            return state      
        default:
            return state
    }
}