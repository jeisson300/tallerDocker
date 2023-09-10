import * as yup from 'yup';




export const PatientValidationSchema = yup.object({
  first_name:yup.string().trim().required('el campo first_name es requerido'),
  last_name:yup.string().trim().required('el campo last_name es requerido'),
  email:yup.string().email('debe ingresar un email válido').required('el campo "email" es requerido'),
  address:yup.string().trim().required('el campo address es requerido'),
  phone:yup.string().trim().required('el campo phone es requerido').length(9, 'El campo phone es demaciado largo'),
  status:yup.number().default(() => 1),
});