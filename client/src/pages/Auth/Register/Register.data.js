import * as Yup from 'yup';

export function initialValues() {
    return {
        name: "",
        lastname: "",
        country: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}

export function validationSchema() {
    return Yup.object({

        name: Yup.string().required(),

        lastname: Yup.string().required(),

        country: Yup.string().required(),

        email: Yup.string().email().required(),

        password: Yup.string().required(),

        repeatPassword: Yup.string()
            .required()
            .oneOf([Yup.ref("password")], "passwords do not match"),
    })
}