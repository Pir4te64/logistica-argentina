import * as Yup from "yup";

// Valores iniciales para el formulario
export const initialValues = {
  name: "",
  telefono: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

// Esquema de validación utilizando Yup
export const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  telefono: Yup.string().required("El teléfono es requerido"),
  email: Yup.string()
    .email("El email no es válido")
    .required("El email es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es requerida"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("La confirmación de la contraseña es requerida"),
});
