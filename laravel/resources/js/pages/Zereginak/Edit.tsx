import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Pisua {
    id: number;
    izena: string;
}

interface Pivot {
    hasiera_data: string;
}

interface Erabiltzailea {
    id: number;
    pivot: Pivot;
}

interface Zeregina {
    id: number;
    izena: string;
    deskripzioa: string;
    pisua_id: number;
    egoera: 'egiteko' | 'egiten' | 'eginda';
    erabiltzaileak: Erabiltzailea[]; // Necesitamos esto para sacar la fecha
}

interface Props {
    auth: any;
    zereginak: Zeregina;
    pisuak: Pisua[];
}

export default function Edit({ zereginak, pisuak }: Props) {

    // 1. EXTRAER LA FECHA ACTUAL
    // Como la fecha está en la tabla pivote, intentamos sacarla del primer usuario asignado.
    // Si no hay fecha, dejamos cadena vacía.
    const currentData = (zereginak.erabiltzaileak && zereginak.erabiltzaileak.length > 0)
    ? zereginak.erabiltzaileak[0].pivot.hasiera_data
    : '';

    // 2. INICIALIZAR EL FORMULARIO
    const { data, setData, put, processing, errors } = useForm({
        izena: zereginak.izena || '',
        deskripzioa: zereginak.deskripzioa || '',
        pisua_id: zereginak.pisua_id || '',
        egoera: zereginak.egoera || 'egiteko',
        hasiera_data: currentData, // <--- CAMPO FECHA
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/zereginak/${zereginak.id}`);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Zereginak', href: '/zereginak' },
        { title: 'Zergina editatu', href: `/zereginak/${zereginak.id}/editatu` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Zeregina editatu" />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Zeregina editatu</h2>

                        <form onSubmit={submit}>



                            {/* CAMPO: IZENA */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="izena">
                                  Izena
                                </label>
                                <input
                                    id="izena"
                                    type="text"
                                    value={data.izena}
                                    onChange={(e) => setData('izena', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.izena && <div className="text-red-500 text-xs italic mt-1">{errors.izena}</div>}
                            </div>

                            {/* CAMPO: DESKRIPZIOA */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deskripzioa">
                                    Deskripzioa
                                </label>
                                <textarea
                                    id="deskripzioa"
                                    value={data.deskripzioa}
                                    onChange={(e) => setData('deskripzioa', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                />
                                {errors.deskripzioa && <div className="text-red-500 text-xs italic mt-1">{errors.deskripzioa}</div>}
                            </div>

                            {/* CAMPO: PISUA */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pisua_id">
                                    Pisua
                                </label>
                                <select
                                    id="pisua_id"
                                    value={data.pisua_id}
                                    onChange={(e) => setData('pisua_id', e.target.value)}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="">-- Aukeratu --</option>
                                    {pisuak.map((piso) => (
                                        <option key={piso.id} value={piso.id}>
                                            {piso.izena}
                                        </option>
                                    ))}
                                </select>
                                {errors.pisua_id && <div className="text-red-500 text-xs italic mt-1">{errors.pisua_id}</div>}
                            </div>

                             {/* --- CAMPO: FECHA (NUEVO) --- */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hasiera_data">
                                    Hasiera-data
                                </label>
                                <input
                                    id="hasiera_data"
                                    type="date"
                                    value={data.hasiera_data}
                                    onChange={(e) => setData('hasiera_data', e.target.value)}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.hasiera_data && <div className="text-red-500 text-xs italic mt-1">{errors.hasiera_data}</div>}
                            </div>

                            {/* CAMPO: ESTADO (EGOERA) */}
                            <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="egoera">
                                    Zereginaren Egoera
                                </label>
                                <select
                                    id="egoera"
                                    value={data.egoera}
                                    onChange={(e) => setData('egoera', e.target.value as any)}
                                    className={`shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium
                                        ${data.egoera === 'egiteko' ? 'text-red-600 bg-red-50 border-red-200' : ''}
                                        ${data.egoera === 'egiten' ? 'text-blue-600 bg-blue-50 border-blue-200' : ''}
                                        ${data.egoera === 'eginda' ? 'text-green-600 bg-green-50 border-green-200' : ''}
                                    `}
                                >
                                    <option value="egiteko">Egiteko</option>
                                    <option value="egiten">Egiten</option>
                                    <option value="eginda">Eginda</option>
                                </select>
                            </div>

                            {/* BOTONES */}
                            <div className="flex items-center justify-end gap-4 border-t pt-4">
                                <a
                                    href="/zereginak"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition"
                                >
                                    Ezeztatu
                                </a>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                                >
                                    Zeregina gorde
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
