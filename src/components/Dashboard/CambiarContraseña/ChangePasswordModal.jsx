// src/components/ChangePasswordModal.jsx
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaTimes } from "react-icons/fa";
import { API_URL } from "@/Api/Api";
import { AuthContext } from "@/Api/AuthContext";

const ChangePasswordModal = ({ userId, isOpen, onClose, onSuccess }) => {
  const { token: contextToken } = useContext(AuthContext);
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);

  // Reiniciar estado al abrir/cerrar
  useEffect(() => {
    if (!isOpen) {
      setApiError(null);
      setApiSuccess(null);
      formik.resetForm();
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("Requerido"),
      newPasswordConfirm: Yup.string()
        .oneOf(
          [Yup.ref("newPassword"), null],
          "Las contraseñas deben coincidir"
        )
        .required("Requerido"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null);
      const authToken = contextToken || localStorage.getItem("token");
      if (!authToken) {
        setApiError("No se encontró token de autenticación");
        setSubmitting(false);
        return;
      }
      try {
        await axios.put(
          `${API_URL.CHANGE_PASSWORD_OTHER}/${userId}/cambiar-password`,
          {
            new_password: values.newPassword,
            new_password_confirmation: values.newPasswordConfirm,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setApiSuccess("Contraseña actualizada con éxito");
        onSuccess();
      } catch (err) {
        setApiError(err.response?.data?.message || err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar panel"
        >
          <FaTimes />
        </button>

        <h3 className="text-lg font-semibold mb-4">
          Cambiar contraseña usuario #{userId}
        </h3>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium">
              Nueva contraseña
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="newPasswordConfirm"
              className="block text-sm font-medium"
            >
              Confirmar nueva contraseña
            </label>
            <input
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPasswordConfirm}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
            {formik.touched.newPasswordConfirm &&
              formik.errors.newPasswordConfirm && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.newPasswordConfirm}
                </p>
              )}
          </div>

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
          {apiSuccess && <p className="text-green-500 text-sm">{apiSuccess}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-custom-blue-medium text-white rounded disabled:opacity-50"
            >
              {formik.isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
