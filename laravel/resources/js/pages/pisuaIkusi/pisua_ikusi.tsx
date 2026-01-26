import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { User, Mail, ShieldCheck } from 'lucide-react';

// --- INTERFAZEAK ---
interface Pivot {
    mota: string;
    created_at: string;
}

interface Kidea {
    id: number;
    name: string;
    email: string;
    profile_photo_url?: string;
    pivot: Pivot;
}

interface Pisua {
    id: number;
    izena: string;
    kodigoa: string;
}

interface Props {
    pisua: Pisua;
    kideak: Kidea[];
}

export default function PisuaIkusi({ pisua, kideak }: Props) {
    return (
        <AppLayout>
            <Head title={`Kideak - ${pisua.izena}`} />

            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* CONTENEDOR PRINCIPAL */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100">

                    {/* TÍTULO Y SUBTÍTULO CENTRADOS */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            {pisua.izena}
                        </h1>
                        <p className="text-lg text-gray-500 mt-2">
                            Pisuaren kideak
                        </p>
                    </div>

                    {/* GRID DE USUARIOS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {kideak.map((kidea) => {
                            const isAdmin = kidea.pivot.mota === 'koordinatzailea';

                            return (
                                <div
                                    key={kidea.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow"
                                >
                                    {/* AVATAR / ICONO */}
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 ${
                                        isAdmin ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {kidea.name.charAt(0).toUpperCase()}
                                    </div>

                                    {/* INFO USUARIO */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-semibold text-gray-800">{kidea.name}</h3>
                                            {isAdmin ? (
                                                <span className="flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    Koordinatzailea
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                                                    <User className="w-3 h-3" />
                                                    Kidea
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                            <Mail className="w-4 h-4" />
                                            {kidea.email}
                                        </div>

                                        <div className="text-xs text-gray-400 mt-2">
                                            Sartu zen eguna: {new Date(kidea.pivot.created_at).toLocaleDateString('eu-ES')}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* SECCIÓN INFERIOR: BOTONES Y CÓDIGO */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-4">
                        <div className="text-sm bg-indigo-50 text-indigo-700 px-4 py-2 rounded-md">
                            Pisuaren Kodea: <span className="font-mono font-bold">{pisua.kodigoa}</span>
                        </div>

                        <button className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors">
                            Atera pisutik
                        </button>
                    </div>

                    {/* MENSAJE SI NO HAY NADIE */}
                    {kideak.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            Ez dago kiderik pisu honetan.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
