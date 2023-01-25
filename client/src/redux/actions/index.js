import axios from 'axios'

export const POST_USER = 'POST_USER';

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
            console.log({ message: error.message })
        }
    }
}