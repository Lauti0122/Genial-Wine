import * as Yup from 'yup';

export function initialValues() {
    return {
        email: "",
        password: "",
        name: "",
        lastname: ""
    }
}

export function validationSchema() {
    return Yup.object({

        email: Yup.string().email().required(),

        password: Yup.string().required()
    })
}