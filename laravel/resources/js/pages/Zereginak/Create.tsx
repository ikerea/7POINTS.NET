import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';


const customGreen = '#00796B';
const backgroundColor = '#f3f4f6';

interface Kidea {
    id: number;
    name: string;
}

interface Props {
    auth: any;
    kideak: Kidea[];
}

export default function Create({ auth,kideak }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        izena: '',
        deskripzioa: '',
        hasiera_data: '',
        erabiltzailea_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/zereginak');
    };



    return (
        <AppLayout>
            <Head title="Zeregin Berria" />
            <div
                className="py-12 flex justify-center min-h-screen"
                style={{ backgroundColor: backgroundColor }}
            >
                <div className="w-full max-w-lg sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-xl rounded-3xl p-8 md:p-10 border border-gray-100">

                        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
                            Zeregina sortu
                        </h2>
                        <div className="w-64 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-4 mb-8"></div>

                        <form onSubmit={submit} className="flex flex-col gap-5">

                            {/* CAMPO: IZENA */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="izena">
                                   Zereginaren izena
                                </label>
                                <input
                                    id="izena"
                                    type="text"
                                    value={data.izena}
                                    onChange={(e) => setData('izena', e.target.value)}
                                    // Nuevo estilo de inputs
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all"
                                    placeholder="Adb: Komuna garbitu"
                                />
                                {errors.izena && <div className="text-red-500 text-sm mt-1 ml-1">{errors.izena}</div>}
                            </div>

                            {/* CAMPO: DESKRIPZIOA */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="deskripzioa">
                                    Deskripzioa
                                </label>
                                <textarea
                                    id="deskripzioa"
                                    value={data.deskripzioa}
                                    onChange={(e) => setData('deskripzioa', e.target.value)}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm min-h-[100px] transition-all"
                                    placeholder="Zereginaren xehetasunak..."
                                />
                                {errors.deskripzioa && <div className="text-red-500 text-sm mt-1 ml-1">{errors.deskripzioa}</div>}
                            </div>

                            {/* --- SELECT: NOR? (QUIÉN) --- */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="kidea">Nork egingo du?</label>
                                <select
                                    id="kidea"
                                    value={data.erabiltzailea_id}
                                    onChange={(e) => setData('erabiltzailea_id', e.target.value)}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all bg-white cursor-pointer"
                                >
                                    <option value="" disabled>Aukeratu kide bat...</option>
                                    {kideak.map((kidea) => (
                                        <option key={kidea.id} value={kidea.id}>
                                            {kidea.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.erabiltzailea_id && <div className="text-red-500 text-sm mt-1 ml-1">{errors.erabiltzailea_id}</div>}
                            </div>

                            {/* INPUT DE FECHA */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="hasiera_data">
                                    Hasiera-data
                                </label>
                                <input
                                    id="hasiera_data"
                                    type="date"
                                    value={data.hasiera_data}
                                    onChange={(e) => setData('hasiera_data', e.target.value)}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all cursor-pointer"
                                />
                                {errors.hasiera_data && <div className="text-red-500 text-sm mt-1 ml-1">{errors.hasiera_data}</div>}
                            </div>

                            {/* BOTONES */}
                            <div className="flex flex-col gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    style={{ backgroundColor: customGreen }}
                                    className="w-full text-white font-bold py-4 px-6 rounded-xl shadow-md hover:opacity-90 transition transform hover:-translate-y-0.5 text-lg"
                                >
                                    Zeregina gorde
                                </button>

                                <a
                                    href="/zereginak"
                                    className="text-center text-gray-500 hover:text-gray-800 transition py-2 text-sm"
                                >
                                    Ezeztatu eta itzuli
                                </a>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
