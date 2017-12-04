import { SET_SELF } from '../../helper/constants'
import _ from 'lodash'

const initialState = {
    self: {}    
}

export default function (state = initialState, action) {        
    switch (action.type) {
        case SET_SELF:            
            return {                
                self: action.self
            }      
        default:
            return state
    }
}