import * as yup from 'yup';




export const LoginValidationSchema = yup.object({
    email: yup.string().email('debe ingresar un email válido').required('el campo "email" es requerido'),
    password: yup.string().trim().required('el campo "password" es requerido'),
});