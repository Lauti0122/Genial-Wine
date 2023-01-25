import { POST_USER, GET_USER } from '../actions'


const initialState = {
    users: [],
    user: {}
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case POST_USER: return { ...state }
        case GET_USER: return { ...state, user: action.payload }
        default: return { ...state }
    }
}