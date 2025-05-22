// src/hooks/useLogisticaImages.js
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, BASE_URL } from "@/Api/Api"; // <-- asumo que lo exportas ahí

const join = (base, rel) =>
    `${base.replace(/\/$/, "")}/${rel.replace(/^\/?/, "")}`;

const useLogisticaImages = () => {
    const [images, setImages] = useState({
        transportistas: [],   // tipo 26
        choferes: [],         // tipo 27
        comisionistas: [],    // tipo 28
    });

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(API_URL.GET_LOGISTICA_IMAGES);

                const files = Array.isArray(data) ? data : data?.files || [];

                const relevantes = files.filter((f) =>
                    ["26", "27", "28"].includes(String(f.tipo_archivo))
                );

                const grouped = {
                    transportistas: relevantes
                        .filter((f) => f.tipo_archivo === "26")
                        .map((f) => join(BASE_URL, f.pathRelative)),

                    choferes: relevantes
                        .filter((f) => f.tipo_archivo === "27")
                        .map((f) => join(BASE_URL, f.pathRelative)),

                    comisionistas: relevantes
                        .filter((f) => f.tipo_archivo === "28")
                        .map((f) => join(BASE_URL, f.pathRelative)),
                };

                setImages(grouped);
            } catch (err) {
                console.error("❌ Error al traer archivos:", err);
            }
        })();
    }, []);

    return images;
};

export default useLogisticaImages;
