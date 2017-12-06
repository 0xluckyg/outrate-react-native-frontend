import { SHOW_SPINNER, SHOW_TOAST } from '../../helper/constants.js'

const initialState = {
    showSpinner: false,
    showToast: false
}

export default function (state = initialState, action) {    
   switch (action.type) {
        case SHOW_SPINNER:
            return { 
                ...state,
                showSpinner: action.show
            }
        case SHOW_TOAST:            
            return {
                ...state,
                showToast: action.show
            }
        default:
            return state
    }
}