import { POST_USER, GET_USER, GET_USERS, UPDATE_USER, GET_ALL_WINES } from '../actions'


const initialState = {
    users: [],
    user: {},
    wines: []
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case POST_USER: return { ...state }
        case GET_USERS: return { ...state, users: action.payload }
        case GET_USER: return { ...state, user: action.payload }
        case UPDATE_USER: return { ...state }
        case GET_ALL_WINES: return { ...state, wines: action.payload }
        default: return { ...state }
    }
}