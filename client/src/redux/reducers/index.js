import { POST_USER, GET_USER, GET_USERS, UPDATE_USER } from '../actions'


const initialState = {
    users: [],
    user: {}
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case POST_USER: return { ...state }
        case GET_USERS: return { ...state, users: action.payload }
        case GET_USER: return { ...state, user: action.payload }
        case UPDATE_USER: return { ...state }
        default: return { ...state }
    }
}