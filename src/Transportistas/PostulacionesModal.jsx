// src/components/Trabajos/PostulacionesModal.jsx
import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useModalStore } from "@/store/useModalStore";
import { AuthContext } from "@/Api/AuthContext";
import { API_URL, BASE_URL } from "@/Api/Api";

const PostulacionesModal = () => {
  const isOpen = useModalStore((s) => s.isPostulacionesOpen);
  const close = useModalStore((s) => s.closePostulaciones);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [allPostulaciones, setAllPostulaciones] = useState([]);
  const [postulacionDetail, setPostulacionDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen || !user?.email) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1) Obtener todas las postulaciones
        const resAll = await axios.get(API_URL.POSTULACIONES, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const all = resAll.data.data ?? resAll.data;
        setAllPostulaciones(all);

        // 2) Buscar la primera que coincida con el email
        const found = all.find((p) => p.email === user.email);
        if (!found) {
          setPostulacionDetail(null);
          return;
        }

        // 3) Obtener detalle de esa postulación
        const resDetail = await axios.get(
          `${API_URL.POSTULACIONES}/${found.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const detail = resDetail.data.data ?? resDetail.data;
        setPostulacionDetail(detail);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, user, token]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="
          bg-white rounded-lg shadow-xl
          w-full max-w-3xl md:max-w-4xl mx-4
          max-h-[90vh] overflow-y-auto
          p-6 relative flex flex-col
        "
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Cerrar modal"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-4">
          Detalle de Postulación
        </h2>

        {/* Loading / Error */}
        {loading && (
          <p className="text-center text-gray-600">Cargando datos…</p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Detail */}
        {!loading && !error && (
          <div className="space-y-6">
            {!postulacionDetail ? (
              <p className="text-center text-gray-600">
                No tienes ninguna postulación.
              </p>
            ) : (
              <>
                {/* Información básica */}
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">ID Postulación:</span>{" "}
                    {postulacionDetail.id}
                  </p>
                  <p>
                    <span className="font-semibold">Servicio ID:</span>{" "}
                    {postulacionDetail.servicios_id}
                  </p>
                  <p>
                    <span className="font-semibold">Fecha Inicio:</span>{" "}
                    {new Date(
                      postulacionDetail.fecha_inicio_servicio
                    ).toLocaleDateString()}
                  </p>
                </div>

                {/* Archivos cargados */}
                {postulacionDetail.usuario.archivos_cargados?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-xl">Archivos Cargados</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                      {postulacionDetail.usuario.archivos_cargados.map(
                        (file) => {
                          // Buscar nombre de tipo de archivo
                          const tipoInfo =
                            postulacionDetail.usuario.roles[0]?.archivos_necesarios.find(
                              (a) => a.id === file.tipo_archivos_id
                            );
                          const label =
                            tipoInfo?.nombre || `Archivo ${file.id}`;
                          return (
                            <a
                              key={file.id}
                              href={`${BASE_URL}/${file.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center border border-gray-200 rounded-lg p-3 hover:shadow-lg transition"
                            >
                              <img
                                src={`${BASE_URL}/${file.url}`}
                                alt={label}
                                className="w-full h-40 object-cover rounded mb-2"
                              />
                              <span className="font-medium text-center">
                                {label}
                              </span>
                            </a>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostulacionesModal;
