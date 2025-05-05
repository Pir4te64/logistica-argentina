// src/hooks/usePostulacionDetail.js
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/Api/AuthContext";
import { API_URL } from "@/Api/Api";

export const usePostulacionDetail = (isOpen) => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isOpen || !user?.email) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // 1) Todas las postulaciones
                const { data: allData } = await axios.get(API_URL.POSTULACIONES, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const all = allData.data ?? allData;

                // 2) Filtrar por email
                const found = all.find((p) => p.email === user.email);
                if (!found) {
                    setDetail(null);
                } else {
                    // 3) Detalle
                    const { data: detailData } = await axios.get(
                        `${API_URL.POSTULACIONES}/${found.id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setDetail(detailData.data ?? detailData);
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isOpen, user, token]);

    return { detail, loading, error };
};
