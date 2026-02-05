import React, { useState } from 'react';
import { Link, router, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Estilos
const customGreen = '#00796B';
const backgroundColor = '#f3f4f6';

// LÍMITES
const MAX_CHARS_GASTO = 50;
const MAX_CHARS_CANTIDAD = 6; // Límite para el precio (ej: 1234567.99)

// Interfaces
interface UserProps {
    id: number;
    name: string;
}

interface Usuarios {
    usuarios: UserProps[]
}

const AddGastoForm = ({ usuarios }: Usuarios) => {

    const [values, setValues] = useState({
        Nombre: '',
        Cantidad: '',
        Fecha: '',
        IdUsuario: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name;
        const value = e.target.value;

        // --- VALIDACIÓN DE LONGITUD PARA EL PRECIO ---
        // Si es el campo 'Cantidad' y supera el límite, no actualizamos el estado.
        if (key === 'Cantidad' && value.length > MAX_CHARS_CANTIDAD) {
            return;
        }

        setValues(values => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/gastuak/addGastua', values);
    };

    return (
        <AppLayout>
            <Head title="Gastu Berria" />

            <div
                className="py-12 flex justify-center min-h-screen"
                style={{ backgroundColor: backgroundColor }}
            >
                <div className="w-full max-w-lg sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-xl rounded-3xl p-8 md:p-10 border border-gray-100">

                        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
                            Gastu Berria
                        </h2>
                        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-4 mb-8"></div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* CAMPO: IZENBURUA (Con contador) */}
                            <div className="grid gap-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="block text-gray-600 font-medium" htmlFor="Nombre">
                                        Izenburua
                                    </label>
                                    <span className={`text-xs ${values.Nombre.length === MAX_CHARS_GASTO ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                                        {values.Nombre.length}/{MAX_CHARS_GASTO}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    id="Nombre"
                                    name="Nombre"
                                    maxLength={MAX_CHARS_GASTO}
                                    value={values.Nombre}
                                    onChange={handleChange}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all"
                                    placeholder="Adib: Erosketa..."
                                    required
                                />
                            </div>

                            {/* CAMPO: ZENBATEKOA (Precio Controlado) */}
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
                                    // Evitamos escribir la 'e' (exponencial) u otros símbolos no deseados
                                    onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all"
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required
                                />
                                {/* Mensaje de ayuda discreto si se acerca al límite (opcional) */}
                                {values.Cantidad.length >= MAX_CHARS_CANTIDAD && (
                                    <p className="text-xs text-red-500 ml-1">Gehienez {MAX_CHARS_CANTIDAD} zenbaki.</p>
                                )}
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
                                    Ordainduta
                                </label>
                                <select
                                    name="IdUsuario"
                                    id="IdUsuario"
                                    value={values.IdUsuario}
                                    onChange={handleChange}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all bg-white cursor-pointer"
                                    required
                                >
                                    <option value="" disabled>-- Aukeratu erabiltzailea --</option>
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
                                    Sortu
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

export default AddGastoForm;
