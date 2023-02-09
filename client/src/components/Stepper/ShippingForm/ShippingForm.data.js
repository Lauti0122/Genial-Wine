import * as Yup from 'yup';

export function initialValues() {
    return {
        email: "",
        address: "",
        country: "",
        city: "",
        cp: "",
        phone: "",

    }
}

export function validationSchema() {
    return Yup.object({

        email: Yup.string().email().required(),

        address: Yup.string().required(),

        country: Yup.string().required(),

        city: Yup.string().required(),

        // cp: Yup.string().required(),

        phone: Yup.string().required(),



    })
}