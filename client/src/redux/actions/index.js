import axios from "axios";

//----------------USER------------------
export const POST_USER = "POST_USER";
export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const CLEAR_USER = "CLEAR_USER";
export const IS_LOGGED = "IS_LOGGED";

//----------------WINES------------------
export const GET_ALL_WINES = "GET_ALL_WINES";
export const GET_WINE = "GET_WINE";
export const FILTER_WINES = "FILTER_WINES";
export const ORDER_WINES = "ORDER_WINES";
export const GET_TRENDING_WINES = "GET_TRENDING_WINES";

//----------------CART------------------
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const GET_CART = "GET_CART";

//----------------ORDER------------------
export const POST_ORDER = "POST_ORDER";

//----------------PAYMENT------------------
export const CREATE_PAYMENT = "CREATE_PAYMENT";

//----------------USER------------------
export function postUser(user) {

  return async function (dispatch) {
    try {
      const newUser = await axios.post("/auth/register", user)

      return dispatch({
        type: POST_USER,
        payload: newUser.data
      })

    }
    catch (error) {
      console.log(`error2: ${error.response.data.message}`)
    }
  }
}

export function getUsers() {
  return async function (dispatch) {
    try {
      const users = await axios.get("/auth/users");
      return dispatch({
        type: GET_USERS,
        payload: users.data
      })
    }
    catch (error) {
      console.log(error);
    }
  }
}

export function getUserByEmail(email) {
  return async function (dispatch) {
    try {
      const user = await axios.get(`/auth/user/${email}`);
      return dispatch({
        type: GET_USER,
        payload: user.data
      })
    }
    catch (error) {
      console.log(error);
    }
  }
}

export function updateUser(data, email) {

  return async function (dispatch) {
    try {

      const updatedUser = await axios.put(`/auth/update/${email}`, data);

      return dispatch({
        type: UPDATE_USER,
        payload: updatedUser
      })
    }
    catch (error) {
      console.log(error);
    }
  }
}

export function isLogged(user) {
  return {
    type: IS_LOGGED,
    payload: user
  }
}

export function clearUser() {
  return {
    type: CLEAR_USER
  }
}

//----------------WINES------------------

export function getAllWines() {
  return async function (dispatch) {
    try {
      const wines = await axios("/wines")
      return dispatch({
        type: GET_ALL_WINES,
        payload: wines.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterWines(byType, byGrape, byName) {
  return {
    type: FILTER_WINES,
    payload: { byType, byGrape, byName }
  }
}

export function orderWines(sort) {
  return {
    type: ORDER_WINES,
    payload: sort
  }
}

export function getWineByID(id) {

  return async function (dispatch) {
    try {
      const wine = await axios.get(`/wines/${id}`);

      return dispatch({
        type: GET_WINE,
        payload: wine.data
      })

    } catch (e) {
      console.log(error)
    }
  }
}

export function getTrendingWines() {
  return async function (dispatch) {
    try {
      const trendingWines = await axios("/wines/trending")
      return dispatch({
        type: GET_TRENDING_WINES,
        payload: trendingWines.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//----------------CART------------------
export function cartAction(id, type) {
  return {
    type: type,
    payload: id
  }
}

export function clearCart() {
  return {
    type: CLEAR_CART
  }
}


//----------------ORDERS------------------

export function postOrder(order) {
  return async function (dispatch) {
    try {
      const newOrder = await axios.post("/orders/post", order)

      return dispatch({
        type: POST_ORDER,
        payload: newOrder.data
      })

    }
    catch (error) {
      console.log(`error2: ${error.response.data.message}`)
    }
  }
}

//----------------PAYMENT------------------
export function createPayment(method, payer, products) {
  console.log(payer);
  console.log(products);
  return async function (dispatch) {
    try {
      if (method === "mercado_pago") {
        const newPayment = await axios.post("/payment/mp", {payer, products});
        return dispatch({
          type: CREATE_PAYMENT,
          payload: newPayment.data
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }
}