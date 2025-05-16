import * as Yup from 'yup';

export const initialValues = {
  name: '',
  telefono: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  roles: '',
  direccion: '',
  provincia: '',
  ciudad: '',
};

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es obligatorio'),

  telefono: Yup.string()
    .matches(/^[0-9]+$/, 'Solo números permitidos')
    .min(7, 'El número de teléfono es muy corto')
    .required('El teléfono es obligatorio'),

  email: Yup.string()
    .email('Debe ser un email válido')
    .required('El email es obligatorio'),

  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),

  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Debes confirmar la contraseña'),

  roles: Yup.string()
    .required('Seleccionar un rol es obligatorio'),

  direccion: Yup.string()
    .min(5, 'La dirección es muy corta')
    .required('La dirección es obligatoria'),

  provincia: Yup.string()
    .min(3, 'La provincia es muy corta')
    .required('La provincia es obligatoria'),

  ciudad: Yup.string()
    .min(2, 'La ciudad es muy corta')
    .required('La ciudad es obligatoria'),
});

