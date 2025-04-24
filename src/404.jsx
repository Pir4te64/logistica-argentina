// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

export default function NotFound() {
    return (
        <Layout>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-800">
                <h1 className="text-[8rem] font-extrabold">404</h1>
                <p className="mt-4 text-2xl">Página no encontrada</p>
                <Link
                    to="/"
                    className="mt-8 inline-block px-6 py-3 bg-custom-blue text-white font-medium rounded-lg hover:bg-custom-blue-medium transition"
                >
                    Volver al inicio
                </Link>
            </div>
        </Layout>
    );
}
