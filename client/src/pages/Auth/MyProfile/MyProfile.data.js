import * as Yup from 'yup';

export function initialValues() {
    return {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        photo: "",
        cp: "",
        city: "",
        country: "",
        address: "",
        birthday: "",

    }
}

export function validationSchema() {
    return Yup.object({

        email: Yup.string().email().required()

    })
}