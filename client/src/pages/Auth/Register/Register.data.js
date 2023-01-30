import * as Yup from 'yup';

export function initialValues() {
    return {
        name: "",
        lastname: "",
        country: "",
        email: "",
        password: "",
        photo: "",
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
        // .min(6, "Please enter a name more than 6 character"),

        repeatPassword: Yup.string()
            .required()
            .oneOf([Yup.ref("password")], "passwords do not match"),
    })
}