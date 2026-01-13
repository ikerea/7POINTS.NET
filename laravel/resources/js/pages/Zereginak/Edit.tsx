import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
// Usamos tu layout correcto
import AppLayout from '../../layouts/app-layout';

interface Pisua {
    id: number;
    izena: string;
}

interface Zeregina {
    id: number;
    izena: string;
    deskripzioa: string;
    pisua_id: number;
}

interface Props {
    auth: any;
    zereginak: Zeregina; // La tarea que vamos a editar
    pisuak: Pisua[];     // La lista de pisos para el select
}

export default function Edit({ zereginak, pisuak }: Props) {
    // Inicializamos el formulario CON los datos que vienen de la BD
    const { data, setData, put, processing, errors } = useForm({
        izena: zereginak.izena || '',
        deskripzioa: zereginak.deskripzioa || '',
        pisua_id: zereginak.pisua_id || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Enviamos PUT a /zereginak/ID
        put(`/zereginak/${zereginak.id}`);
    };

    // Migas de pan
    const breadcrumbs = [
        { title: 'Zereginak', href: '/zereginak' },
        { title: 'Editar Tarea', href: `/zereginak/${zereginak.id}/editatu` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Tarea" />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-200">

                        <h2 className="text-xl font-bold mb-4 text-gray-800">Editar Tarea</h2>

                        <form onSubmit={submit}>
                            {/* CAMPO: IZENA */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="izena">
                                    Nombre (Izena)
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
                                    Descripción
                                </label>
                                <textarea
                                    id="deskripzioa"
                                    value={data.deskripzioa}
                                    onChange={(e) => setData('deskripzioa', e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.deskripzioa && <div className="text-red-500 text-xs italic mt-1">{errors.deskripzioa}</div>}
                            </div>

                            {/* CAMPO: PISUA (SELECT) */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pisua_id">
                                    Asignar a un Piso
                                </label>
                                <select
                                    id="pisua_id"
                                    value={data.pisua_id}
                                    onChange={(e) => setData('pisua_id', e.target.value)}
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="">-- Selecciona un piso --</option>
                                    {pisuak.map((piso) => (
                                        <option key={piso.id} value={piso.id}>
                                            {piso.izena}
                                        </option>
                                    ))}
                                </select>
                                {errors.pisua_id && <div className="text-red-500 text-xs italic mt-1">{errors.pisua_id}</div>}
                            </div>

                            {/* BOTONES */}
                            <div className="flex items-center justify-end gap-4">
                                <a
                                    href="/zereginak"
                                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                                >
                                    Cancelar
                                </a>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
                                >
                                    Actualizar Tarea
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
