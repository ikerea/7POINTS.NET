import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
// HE BORRADO EL IMPORT DEL LAYOUT QUE DABA ERROR

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
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/zereginak');
    };

    return (
        // HE CAMBIADO EL LAYOUT POR UN DIV NORMAL CON ALGO DE MARGEN (p-10)
        <div className="min-h-screen bg-gray-100 p-10">
            <Head title="Nueva Tarea" />

            {/* BOTÓN PARA VOLVER AL DASHBOARD O AL INICIO MANUALMENTE */}
            <div className="mb-6">
                <a href="/zereginak" className="text-blue-600 underline">
                    &larr; Volver al listado
                </a>
            </div>

            <div className="max-w-md mx-auto">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Crear Nueva Tarea</h2>

                    <form onSubmit={submit}>
                        {/* CAMPO: IZENA */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="izena">
                                Nombre de la Tarea (Izena)
                            </label>
                            <input
                                id="izena"
                                type="text"
                                value={data.izena}
                                onChange={(e) => setData('izena', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Ej: Limpiar el baño"
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
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Detalles de la tarea..."
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
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
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
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition"
                            >
                                Guardar Tarea
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
