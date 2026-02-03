import React, { useState } from 'react';
import { Link, router, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Estilos extraídos de Create.tsx para mantener consistencia
const customGreen = '#00796B';
const backgroundColor = '#f3f4f6';

// Interfaces
interface UserProps {
    id: number;
    name: string;
}

interface Gasto {
    IdGasto: number;
    Nombre: string;
    IdUsuario: number;
    Cantidad: number;
    Fecha: string;
}

interface EditGastoProps {
    gasto: Gasto;
    usuarios: UserProps[];
}

const EditGastoForm = ({ gasto, usuarios }: EditGastoProps) => {

    // Lógica para formatear la fecha correctamente para el input (YYYY-MM-DD)
    const formattedDate = gasto.Fecha ? gasto.Fecha.split('T')[0] : '';

    const [values, setValues] = useState({
        Nombre: gasto.Nombre || '',
        Cantidad: gasto.Cantidad || '',
        Fecha: formattedDate,
        IdUsuario: gasto.IdUsuario || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/gastuak/editar/${gasto.IdGasto}`, values);
    };

    return (
        <AppLayout>
            <Head title="Gastua Editatu" />

            {/* Contenedor principal estilo Create */}
            <div
                className="py-12 flex justify-center min-h-screen"
                style={{ backgroundColor: backgroundColor }}
            >
                <div className="w-full max-w-lg sm:px-6 lg:px-8">

                    {/* Tarjeta blanca */}
                    <div className="bg-white overflow-hidden shadow-xl rounded-3xl p-8 md:p-10 border border-gray-100">

                        {/* Título y separador */}
                        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
                            Gastua Editatu
                        </h2>
                        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-4 mb-8"></div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* CAMPO: IZENBURUA */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="Nombre">
                                    Izenburua
                                </label>
                                <input
                                    type="text"
                                    id="Nombre"
                                    name="Nombre"
                                    value={values.Nombre}
                                    onChange={handleChange}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all"
                                    placeholder="Adib: Erosketa..."
                                    required
                                />
                            </div>

                            {/* CAMPO: ZENBATEKOA */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="Cantidad">
                                    Zenbatekoa (€)
                                </label>
                                <input
                                    type="number"
                                    id="Cantidad"
                                    name="Cantidad"
                                    value={values.Cantidad}
                                    onChange={handleChange}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all"
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* CAMPO: DATA */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="Fecha">
                                    Data
                                </label>
                                <input
                                    type="date"
                                    id="Fecha"
                                    name="Fecha"
                                    value={values.Fecha}
                                    onChange={handleChange}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all cursor-pointer"
                                    required
                                />
                            </div>

                            {/* SELECT: ORDAINDUTA */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="IdUsuario">
                                    Nork ordaindu du?
                                </label>
                                <select
                                    name="IdUsuario"
                                    id="IdUsuario"
                                    value={values.IdUsuario}
                                    onChange={handleChange}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all bg-white cursor-pointer"
                                    required
                                >
                                    <option value="" disabled>-- Aukeratu kide bat --</option>
                                    {usuarios.map(usuario => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* BOTONES */}
                            <div className="flex flex-col gap-3 mt-6">
                                <button
                                    type="submit"
                                    style={{ backgroundColor: customGreen }}
                                    className="w-full text-white font-bold py-4 px-6 rounded-xl shadow-md hover:opacity-90 transition transform hover:-translate-y-0.5 text-lg"
                                >
                                    Gorde Aldaketak
                                </button>

                                <Link
                                    href="/gastuak"
                                    className="text-center text-gray-500 hover:text-gray-800 transition py-2 text-sm"
                                >
                                    Utzi eta itzuli
                                </Link>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditGastoForm;
