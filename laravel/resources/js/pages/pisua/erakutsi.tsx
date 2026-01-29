import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { ArrowRight, User as UserIcon } from 'lucide-react';

// --- IMPORTAMOS LOS COMPONENTES DE UI ---
import { Button } from '@/components/ui/button';

interface User {
    id: number;
    name: string;
}

interface Pisua {
    id: number;
    izena: string;
    kodigoa: string;
    user?: User | null
}

interface ErakutsiProps {
    pisuak: Pisua[];
}

const customGreen = '#00796B';

export default function Erakutsi({ pisuak }: ErakutsiProps) {


    const handleSelect = (id: number) => {
        router.post(`/pisua/${id}/aukeratu`);
    };

    return (
        <>
            <Head title="Pisuen Zerrenda" />

            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>
                {/* HEADER */}
                <header className="w-full py-5 shadow-md" style={{ backgroundColor: customGreen }}>
                    <div className="max-w-6xl mx-auto px-6 text-white flex items-center justify-between">
                        <Link href="/dashboard" className="text-xl font-bold hover:opacity-80 transition">
                            PISUKIDE
                        </Link>
                    </div>
                </header>

                <main className="flex-grow flex items-start justify-center p-6 mt-4">
                    <div className="w-full max-w-6xl">

                        {/* TÍTULO Y BOTÓN DE CREAR */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">
                                    Pisuen Zerrenda
                                </h2>
                                <p className="text-gray-500 mt-1">Aukeratu pisu bat kudeatzeko</p>
                            </div>

                            <Link
                                href="/pisua/aukeratu"
                                className="px-5 py-2.5 text-white font-medium rounded-xl shadow transition hover:opacity-90 flex gap-2"
                                style={{ backgroundColor: customGreen }}
                            >
                                <FaHouseChimneyMedical size={20} color='white' />
                            </Link>
                        </div>

                        {/* CONTENIDO PRINCIPAL: GRID DE CARDS */}
                        {pisuak.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-3xl shadow-lg border border-dashed border-gray-300">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-teal-50 mb-4">
                                    <FaHouseChimneyMedical className="h-8 w-8 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900">Ez dago pisurik</h3>
                                <p className="text-gray-500 mt-2">Hasi berri bat sortzen botoia sakatuz.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pisuak.map((pisua) => (
                                    <div
                                        key={pisua.id}
                                        className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col overflow-hidden group"
                                    >
                                        {/* CARD HEADER */}
                                        <div className="p-6 pb-2 flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-teal-50 p-3 rounded-xl group-hover:bg-teal-100 transition-colors">
                                                    <FaHouseChimneyMedical className="text-teal-600 h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 text-lg leading-tight">
                                                        {pisua.izena}
                                                    </h3>
                                                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                                                        #{pisua.kodigoa}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                        {/* CARD BODY (Info) */}
                                        <div className="px-6 py-4 flex-grow">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                <UserIcon className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium text-gray-500">Kord:</span>
                                                {pisua.user ? (
                                                    <span className="font-semibold text-gray-800 truncate">
                                                        {pisua.user.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 italic">Esleitu gabe</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* CARD FOOTER (Action Button) */}
                                        <div className="p-6 pt-0 mt-auto">
                                            <Button
                                                className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg transition-all h-11 text-base group-hover:scale-[1.02]"
                                                onClick={() => handleSelect(pisua.id)}
                                            >
                                                Sartu <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
