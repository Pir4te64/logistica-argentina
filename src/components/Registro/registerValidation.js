// src/components/Registro/registerValidation.js
import * as Yup from "yup";

export const initialValues = {
  name: "",
  telefono: "",
  email: "",
  roles: "",                   // ← nuevo campo
  password: "",
  passwordConfirmation: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  telefono: Yup.string().required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  roles: Yup.string().required("Debes elegir un rol"),  // ← validación
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Requerido"),
});
