import axios from 'axios';

export const POST_USER = 'POST_USER';
export const GET_USER = 'GET_USER';

export function postUser(user) {

    return async function (dispatch) {
        try {
            const newUser = await axios.post("/api/auth/register", user)

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

export function getUserByEmail(email) {
    return async function (dispatch) {
        try {
            const user = await axios.get(`/users/${email}`);

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