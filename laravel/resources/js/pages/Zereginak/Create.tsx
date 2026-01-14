import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';


interface Pisua {
    id: number;
    izena: string;
}

interface Props {
    auth: any;
    pisuak: Pisua[];
}

export default function Create({ auth, pisuak }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        izena: '',
        deskripzioa: '',
        pisua_id: '',
         hasiera_data: '',
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/zereginak');
    };

    const breadcrumbs: BreadcrumbItem[] = [
            { title: 'Zereginak', href: '/zereginak' },
            { title: 'Zereginak sortu', href: '/zereginak/sortu' },
        ];

    return (

       <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva Tarea" />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">

                    {/* Botón "Volver" opcional (puedes quitarlo si usas los breadcrumbs) */}
                    <div className="mb-6">
                        <a href="/zereginak" className="text-sm text-gray-600 hover:text-gray-900 underline">
                            &larr; Atzera
                        </a>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Zeregina sortu</h2>

                        <form onSubmit={submit}>
                            {/* CAMPO: IZENA */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="izena">
                                   Zereginaren izena
                                </label>
                                <input
                                    id="izena"
                                    type="text"
                                    value={data.izena}
                                    onChange={(e) => setData('izena', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Adb:Komuna garbitu"
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
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Zereginaren xehetasunak..."
                                />
                                {errors.deskripzioa && <div className="text-red-500 text-xs italic mt-1">{errors.deskripzioa}</div>}
                            </div>

                            {/* CAMPO: PISUA (SELECT) */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pisua_id">
                                    Pisua
                                </label>
                                <select
                                    id="pisua_id"
                                    value={data.pisua_id}
                                    onChange={(e) => setData('pisua_id', e.target.value)}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="">-- Pisua aukeratu --</option>
                                    {pisuak.map((piso) => (
                                        <option key={piso.id} value={piso.id}>
                                            {piso.izena}
                                        </option>
                                    ))}
                                </select>
                                {errors.pisua_id && <div className="text-red-500 text-xs italic mt-1">{errors.pisua_id}</div>}
                            </div>

                            {/* INPUT DE FECHA */}
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

                            {/* BOTONES */}
                            <div className="flex items-center justify-end gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
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
