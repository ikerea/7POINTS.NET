import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Users, PlusCircle, ArrowLeft } from 'lucide-react';

const customGreen = '#00796B';

interface AukeratuProps {
    hasPisos: boolean;
}

export default function Aukeratu({ hasPisos }: AukeratuProps) {
    //Estado para controlar si mostramos los botones o el formulario
    const [viewMode, setViewMode] = useState<'selection' | 'join'>('selection');

    //Formulario para unirse al piso
    const { data, setData, post, processing, errors, reset } = useForm({
        kodigoa: '',
    });

    const submitJoin = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pisua/batu', {
            onFinish: () => reset('kodigoa'),
        });
    };

    return (
        <>
            <Head title="Ongi Etorri Pisukide-ra" />

            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>
                <header className="w-full py-5 shadow-md" style={{ backgroundColor: customGreen }}>
                    <div className="max-w-4xl mx-auto px-6 text-white flex items-center justify-center">
                        <span className="text-xl font-bold tracking-wide">PISUKIDE</span>
                    </div>
                </header>
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10 md:p-12 transition-all duration-300">
                        {viewMode === 'selection' && (
                            <div className="flex flex-col gap-6 text-center">
                                {hasPisos && ( //SI ES BOOLEAN BASTA CON '&&'
                                    <Link
                                        href="/pisua/erakutsi"
                                        className="flex items-center text-gray-400 hover:text-gray-600 mb-6 transition"
                                    >
                                        <ArrowLeft size={20} className="mr-1" /> Atzera
                                    </Link>
                                )}
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                    Ongi Etorri! <br /> Zer egin nahi duzu?
                                </h1>
                                <button
                                    onClick={() => setViewMode('join')}
                                    className="group flex flex-col items-center justify-center gap-3 p-6 border-2 border-gray-100 rounded-2xl hover:border-teal-600 hover:bg-teal-50 transition duration-200"
                                >
                                    <div className="p-4 bg-teal-100 rounded-full text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition">
                                        <Users size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">Pisu batera batu</h3>
                                        <p className="text-sm text-gray-500">Dagoeneko kode bat dut</p>
                                    </div>
                                </button>
                                <Link
                                    href="/pisua/sortu"
                                    className="group flex flex-col items-center justify-center gap-3 p-6 border-2 border-gray-100 rounded-2xl hover:border-teal-600 hover:bg-teal-50 transition duration-200"
                                >
                                    <div className="p-4 bg-blue-100 rounded-full text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition">
                                        <PlusCircle size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">Pisu berria sortu</h3>
                                        <p className="text-sm text-gray-500">Hutsetik hasi nahi dut</p>
                                    </div>
                                </Link>
                            </div>
                        )}
                        {viewMode === 'join' && (
                            <div className="flex flex-col">
                                <button
                                    onClick={() => setViewMode('selection')}
                                    className="flex items-center text-gray-400 hover:text-gray-600 mb-6 transition"
                                >
                                    <ArrowLeft size={20} className="mr-1" /> Atzera
                                </button>

                                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                    Sartu Pisuaren Kodea
                                </h2>

                                <form onSubmit={submitJoin} className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <label htmlFor="kodigoa" className="text-sm font-medium text-gray-700">
                                            Kodea (Adibidez: 001)
                                        </label>
                                        <input
                                            id="kodigoa"
                                            type="text"
                                            value={data.kodigoa}
                                            onChange={(e) => setData('kodigoa', e.target.value)}
                                            placeholder="Idatzi hemen..."
                                            className="flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-center tracking-widest"
                                            autoFocus
                                        />
                                        {errors.kodigoa && (
                                            <p className="text-red-500 text-sm mt-1 text-center">{errors.kodigoa}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full text-lg py-3 rounded-xl hover:opacity-90 transition shadow-md text-white font-semibold disabled:opacity-70 flex justify-center items-center"
                                        style={{ backgroundColor: customGreen }}
                                    >
                                        {processing ? 'Egiaztatzen...' : 'Sartu Pisuan'}
                                    </button>
                                </form>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </>
    );
}
