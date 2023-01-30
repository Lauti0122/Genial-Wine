import { POST_USER, GET_USER, GET_USERS, UPDATE_USER, GET_ALL_WINES, ADD_TO_CART, REMOVE_ONE_FROM_CART, REMOVE_ALL_FROM_CART, CLEAR_CART, FILTER_WINES, IS_LOGGED, CLEAR_USER, GET_WINE, ORDER_WINES } from '../actions';

const initialState = {
    users: [],
    user: {},
    wines: [],
    wine: {},
    filterWines: [],
    cart: [],
    isLogged: false
}

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        //----------------USER---------------
        case POST_USER: return { ...state }
        case GET_USERS: return { ...state, users: action.payload }
        case GET_USER: return { ...state, user: action.payload }
        case UPDATE_USER: return { ...state }
        case IS_LOGGED: { 
          return { ...state, isLogged: action.payload }
        }
        case CLEAR_USER: return { ...state, user: {} }

        //----------------WINES---------------
        case GET_ALL_WINES: return { ...state, wines: action.payload, filterWines: action.payload }
        case GET_WINE: return { ...state, wine: action.payload }
        case FILTER_WINES: {
          let winesByFilter = [...state.filterWines];
          const byType = action.payload.byType;
          const byGrape = action.payload.byGrape;
          const byName = action.payload.byName;
          let winesByType;

          if (byType) {
            if (byType !== "all") {
              winesByType = winesByFilter = winesByFilter.filter(wine => wine.type.includes(byType));
              winesByFilter = winesByType;
            }
            else winesByFilter = [ ...state.filterWines ]
          }

          if (byGrape) {
            if (byGrape === "all") winesByFilter = winesByType ? winesByType : [...state.filterWines];
            else winesByFilter = winesByFilter.filter(wine => wine.grape_type.includes(byGrape));
          }

          if (byName) {
            winesByFilter = winesByFilter.filter(wine => wine.name.toLowerCase().includes(byName.toLowerCase()));
          }

          return { ...state, wines: winesByFilter }
        }
        case ORDER_WINES: {
          const sort = action.payload;
          const winesForOrder = [...state.wines];
          let orderedWines;
          if (sort) {
            if (sort === "low") {
              orderedWines = winesForOrder.sort((a, b) => {
                if (a.price > b.price) return 1;
                if (b.price > a.price) return -1;
                return 0;
              })
            }
            else if (sort === "high") {
              orderedWines = winesForOrder.sort((a, b) => {
                if (a.price > b.price) return -1;
                if (b.price > a.price) return 1;
                return 0;
              })
            }
          }
          return { ...state, wines: orderedWines }
        }

        //----------------CART---------------
        case ADD_TO_CART: {
            let newItem = state.wines.find(p => p.id === action.payload);
            let itemExists = state.cart.find(i => i.id === newItem.id);
            return itemExists
                ? { ...state, cart: state.cart.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i) }
                : { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] }
        }
        case REMOVE_ONE_FROM_CART: {
            let findItem = state.cart.find(i => i.id === action.payload);

            return findItem.quantity > 1
                ? { ...state, cart: state.cart.map(i => i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i) }
                : { ...state, cart: state.cart.filter(i => i.id !== action.payload) }
        }
        case REMOVE_ALL_FROM_CART: {
            return { ...state, cart: state.cart.filter(i => i.id !== action.payload) }
        }
        case CLEAR_CART: return { ...state, cart: [] }

        default: return { ...state }
    }
}