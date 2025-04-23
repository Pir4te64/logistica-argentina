import React, { useEffect } from 'react'
import { usePostulacionesStore } from '@/components/Dashboard/Postulaciones/usePostulacionesStore.JS';

const Postulaciones = () => {
    const { postulaciones, loading, error, fetchPostulaciones } = usePostulacionesStore();

    useEffect(() => {
        fetchPostulaciones();
    }, [fetchPostulaciones]);
    return (
        <div>Postulaciones</div>
    )
}

export default Postulaciones