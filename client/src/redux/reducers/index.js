import { POST_USER } from '../actions'

const initialState = {
    users: []
}

export default function rootReducer(state = initialState, actions) {

    switch (actions.type) {
        case POST_USER: return { ...state }

        default: return { ...state }
    }
}