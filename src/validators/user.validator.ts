import * as yup from 'yup';




export const UserValidationSchema = yup.object({
  first_name:yup.string().trim().required('el campo first_name es requerido'),
  last_name:yup.string().trim().required('el campo last_name es requerido'),
  email:yup.string().email('debe ingresar un email válido').required('el campo "email" es requerido'),
  password:yup.string().trim().required('el campo "password" es requerido'),
  id_role:yup.number().default(() => 1),
  status:yup.number().default(() => 1),
});