import {SHOW_SPINNER, SHOW_TOAST} from '../../helper/constants.js'

export function showSpinner(show) {
    return { type: SHOW_SPINNER, show }
}

export function showToast(show) {    
    return { type: SHOW_TOAST, show }
}