import React from 'react';
import { Head, Link, router } from '@inertiajs/react'; // Importamos router para borrar
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { MoreVertical, Pencil, Trash2, LogIn } from 'lucide-react'; // Iconos nuevos

// --- IMPORTAMOS LOS COMPONENTES DE UI ---
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

    const handleDelete = (id: number) => {
        if (confirm('Ziur zaude pisu hau ezabatu nahi duzula?')) {
            router.delete(`/pisua/${id}`);
        }
    };

    const handleSelect = (id: number) => {
        router.post(`/pisua/${id}/aukeratu`);
    };

    return (
        <>
            <Head title="Pisuen Zerrenda" />

            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>
                <header className="w-full py-5 shadow-md" style={{ backgroundColor: customGreen }}>
                    <div className="max-w-6xl mx-auto px-6 text-white flex items-center justify-between">
                        <Link href="/dashboard" className="text-xl font-bold hover:opacity-80 transition">
                            PISUKIDE
                        </Link>
                    </div>
                </header>
                <main className="flex-grow flex items-start justify-center p-6 mt-4">
                    <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl p-8 md:p-10 overflow-hidden">

                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <h2 className="text-3xl font-bold text-gray-800">
                                Pisuen Zerrenda
                            </h2>
                            <Link
                                href="/pisua/sortu"
                                className="px-5 py-2.5 text-white font-medium rounded-xl shadow transition hover:opacity-90 flex gap-2"
                                style={{ backgroundColor: customGreen }}
                            >
                                <FaHouseChimneyMedical size={25} color='white' />
                            </Link>
                        </div>

                        {pisuak.length === 0 ? (
                            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-gray-500 text-lg">Ez dago pisurik erakusteko.</p>
                                <p className="text-gray-400 text-sm mt-2">Hasi berri bat sortzen!</p>
                            </div>
                        ) : (
                            // --- TABLA ---
                            <div className="overflow-visible rounded-xl border border-gray-100">
                                {/* Nota: overflow-visible o auto. Si el dropdown se corta, usa overflow-visible en el contenedor padre o el DropdownMenu usará Portal automáticamente */}
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Izena
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Kodea
                                            </th>
                                            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Koordinatzailea
                                            </th>
                                            {/* Columna vacía para las acciones */}
                                            <th scope="col" className="relative px-6 py-4">
                                                <span className="sr-only">Ekintzak</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pisuak.map((pisua) => (
                                            <tr key={pisua.id} className="hover:bg-gray-50 transition-colors group">
                                                {/* 1. Hacemos que la celda del NOMBRE sea clicable para entrar */}
                                                <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 cursor-pointer"
                                                    onClick={() => handleSelect(pisua.id)}
                                                >
                                                    <div className="flex items-center gap-2 hover:text-teal-700 transition-colors">
                                                        <LogIn className="w-4 h-4 text-gray-400" />
                                                        {pisua.izena}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className="bg-teal-50 text-teal-700 py-1 px-3 rounded-full text-xs font-medium border border-teal-100">
                                                        {pisua.kodigoa}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {pisua.user ? (
                                                        <span className="font-medium">{pisua.user.name}</span>
                                                    ) : (
                                                        <span className="text-gray-400 italic text-xs">Esleitu gabe</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {/* 2. Botón explícito "Sartu" que aparece al pasar el ratón */}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="mr-3 hidden group-hover:inline-flex text-teal-700 border-teal-200 hover:bg-teal-50"
                                                        onClick={() => handleSelect(pisua.id)}
                                                    >
                                                        Sartu
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200">
                                                                <MoreVertical className="h-5 w-5 text-gray-500" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    href={`/pisua/${pisua.id}/edit`}
                                                                    className="flex items-center w-full cursor-pointer"
                                                                >
                                                                    <Pencil className="mr-2 h-4 w-4" /> Editatu
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleDelete(pisua.id)}
                                                                className="text-red-600 focus:text-red-600 cursor-pointer"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" /> Ezabatu
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
