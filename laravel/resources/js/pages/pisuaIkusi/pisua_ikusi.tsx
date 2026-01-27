import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { User, Mail, MoreVertical, ShieldCheck, Copy, Check, Pencil, Trash2, UserMinus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

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
    const [copied, setCopied] = useState(false);

    const kopiatuKodea = () => {
        navigator.clipboard.writeText(pisua.kodigoa);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // --- EKINTZAK (ACTIONS) ---

    // Pisu osoa ezabatu
    const handleDelete = (id: number) => {
        if (confirm('Ziur zaude pisu hau ezabatu nahi duzula?')) {
            router.delete(`/pisua/${id}`);
        }
    };

    // Erabiltzaile bat koordinatzaile bihurtu
    const handlePromote = (kideaId: number) => {
        // OHARRA: Ziurtatu zure `web.php` fitxategian URL hau existitzen dela
        // Adibidez: Route::put('/pisua/{pisua}/kidea/{kidea}/promote', ...)
        router.put(`/pisua/${pisua.id}/kidea/${kideaId}/promote`, {}, {
            preserveScroll: true,
        });
    };

    // Erabiltzailea pisotik kendu
    const handleKick = (kideaId: number) => {
        if (confirm('Ziur zaude erabiltzaile hau pisotik bota nahi duzula?')) {
            // CORRECCIÓN: Añadido "/remove" al final para coincidir con web.php
            router.delete(`/pisua/${pisua.id}/kidea/${kideaId}/remove`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout>
            <Head title={`Kideak - ${pisua.izena}`} />

            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
               <div className="relative bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-100">

                    {/* --- MENÚ DE OPCIONES PISUA --- */}
                    <div className="absolute top-6 right-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-700 rounded-full">
                                    <MoreVertical className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Pisuaren Aukerak</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={`/pisua/${pisua.id}/edit`} className="cursor-pointer flex items-center">
                                        <Pencil className="mr-2 h-4 w-4 text-blue-500" /> Editatu
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleDelete(pisua.id)}
                                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> Ezabatu
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* TÍTULO */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            {pisua.izena}
                        </h1>
                        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-4 mb-8"></div>
                    </div>
                    <p className="text-lg text-gray-500 mt-2 mb-4">
                        Pisuaren kideak:
                    </p>

                    {/* GRID DE USUARIOS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {kideak.map((kidea) => {
                            const isAdmin = kidea.pivot.mota === 'koordinatzailea';

                            return (
                                <div
                                    key={kidea.id}
                                    className="relative bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4 hover:shadow-md transition-shadow pr-10"
                                >
                                    {/* --- MENÚ DE OPCIONES KIDEA --- */}
                                    <div className="absolute top-3 right-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-700 rounded-full">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Kudeaketa</DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                {/* Koordinatzaile egin */}
                                                {!isAdmin && (
                                                    <DropdownMenuItem
                                                        onClick={() => handlePromote(kidea.id)}
                                                        className="cursor-pointer"
                                                    >
                                                        <ShieldCheck className="mr-2 h-4 w-4 text-indigo-600" />
                                                        Koordinatzaile egin
                                                    </DropdownMenuItem>
                                                )}

                                                {/* Pisotik kendu */}
                                                <DropdownMenuItem
                                                    onClick={() => handleKick(kidea.id)}
                                                    className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                                                >
                                                    <UserMinus className="mr-2 h-4 w-4" />
                                                    Pisotik kendu
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* AVATAR */}
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 ${
                                        isAdmin ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {kidea.name.charAt(0).toUpperCase()}
                                    </div>

                                    {/* INFO USUARIO */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                            <h3 className="text-lg font-semibold text-gray-800 truncate">{kidea.name}</h3>
                                            {isAdmin ? (
                                                <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium w-fit">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    Koordinatzailea
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium w-fit">
                                                    <User className="w-3 h-3" />
                                                    Kidea
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 truncate">
                                            <Mail className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate">{kidea.email}</span>
                                        </div>

                                        <div className="text-xs text-gray-400 mt-2">
                                            Sartu zen eguna: {new Date(kidea.pivot.created_at).toLocaleDateString('eu-ES')}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* BEHEKO PARTEA */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-row items-center justify-between">
                        <button className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors">
                            Atera pisutik
                        </button>
                        <button
                            onClick={kopiatuKodea}
                            className="group flex items-center gap-3 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md transition-all cursor-pointer border border-transparent hover:border-indigo-200 active:scale-95 relative"
                            title="Kopiatu kodea"
                        >
                            <span>Pisuaren Kodea:</span>
                            <span className="font-mono font-bold text-lg tracking-wide">
                                {pisua.kodigoa}
                            </span>
                            <div className="text-indigo-400">
                                {copied ? (
                                    <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                    <Copy className="w-4 h-4 group-hover:text-indigo-600 transition-colors" />
                                )}
                            </div>
                            {copied && (
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg animate-fade-in-up">
                                    Kopiatuta!
                                </span>
                            )}
                        </button>
                    </div>

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
