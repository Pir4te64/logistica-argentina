// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
export default function NotFound() {
    return (
        <Layout>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-800">
                <h1 className="text-[8rem] font-extrabold">404</h1>
                <p className="mt-4 text-2xl">Página no encontrada</p>
                <Link
                    to="/"
                    className="mt-8 inline-block rounded-lg bg-custom-blue px-6 py-3 font-medium text-white transition hover:bg-custom-blue-medium"
                >
                    Volver al inicio
                </Link>
            </div>
        </Layout>
    );
}
