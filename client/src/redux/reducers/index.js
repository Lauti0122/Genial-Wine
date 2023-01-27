import { POST_USER, GET_USER, GET_USERS, UPDATE_USER, GET_ALL_WINES, ADD_TO_CART, REMOVE_ONE_FROM_CART, REMOVE_ALL_FROM_CART, CLEAR_CART } from '../actions'


const initialState = {
    users: [],
    user: {},
    wines: [],
    cart: []
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        //----------------USER---------------
        case POST_USER: return { ...state }
        case GET_USERS: return { ...state, users: action.payload }
        case GET_USER: return { ...state, user: action.payload }
        case UPDATE_USER: return { ...state }

        //----------------WINES---------------
        case GET_ALL_WINES: return { ...state, wines: action.payload }
        
        //----------------CART---------------
        case ADD_TO_CART: {
          let newItem = state.products.find(p => p.id === action.payload);
          let itemExists = state.cart.find(i => i.id === newItem.id);
          return itemExists 
              ? { ...state, cart: state.cart.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i) }
              : { ...state, cart: [ ...state.cart, { ...newItem, quantity: 1 } ] }
        }
        case REMOVE_ONE_FROM_CART: {
            let findItem = state.cart.find(i => i.id === action.payload);        
            
            return findItem.quantity > 1 
                ? { ...state, cart: state.cart.map(i => i.id === action.payload ? { ...i, quantity: i.quantity - 1} : i) }
                : { ...state, cart: state.cart.filter(i => i.id !== action.payload)}
        }
        case REMOVE_ALL_FROM_CART: {
            return { ...state, cart: state.cart.filter(i => i.id !== action.payload)}
        }
        case CLEAR_CART: return { ...state, cart: [] }

        default: return { ...state }
    }
}