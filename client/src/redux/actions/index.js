import axios from "axios";

export const POST_USER = "POST_USER";
export const GET_USERS = "GET_USERS";
export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";

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

  // console.log(data, email)
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