// formConfig.js
import * as Yup from "yup";

export const initialValues = {
  ciudad: "",
  vehiculo: "",
  empresa: "",
};

export const validationSchema = Yup.object({
  ciudad: Yup.string().required("Campo requerido"),
  vehiculo: Yup.string().required("Campo requerido"),
  empresa: Yup.string().required("Campo requerido"),
});
