import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

// El mismo color verde que en el Login/Welcome
const customGreen = '#00796B';

export default function Sortu() {
    // useForm hook-ak formularioaren egoera, erroreak eta bidalketa kudeatzen ditu
    const { data, setData, post, processing, errors } = useForm({
        pisuaren_izena: '',
        pisuaren_kodigoa: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Hemen zure Laravel rutara egiten duzu deia.
        post('/pisua');
    };

    return (
        <>
            <Head title="Sortu Pisua" />
            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>
                <header className="w-full py-5 shadow-md" style={{ backgroundColor: customGreen }}>
                    <div className="max-w-4xl mx-auto px-6 text-white flex items-center justify-between text-lg font-medium">
                        <Link href="/dashboard" className="font-bold hover:opacity-80 transition">
                            PISUKIDE
                        </Link>
                    </div>
                </header>
                <main className="flex-grow flex items-center justify-center p-6">
                    {/* Tarjeta con bordes redondeados y sombra (Igual que Login) */}
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10 md:p-12">

                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                            Sortu Pisua
                        </h2>

                        <form onSubmit={submit} className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <label
                                    htmlFor="izena"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Pisuaren Izena
                                </label>
                                <input
                                    type="text"
                                    name="pisuaren_izena"
                                    id="izena"
                                    value={data.pisuaren_izena}
                                    onChange={(e) => setData('pisuaren_izena', e.target.value)}
                                    required
                                    className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 text-black shadow-sm"
                                />
                                {errors.pisuaren_izena && (
                                    <p className="text-red-500 text-sm mt-1">{errors.pisuaren_izena}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <label
                                    htmlFor="kodigoa"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Pisuaren Kodigoa
                                </label>
                                <input
                                    type="text"
                                    name="pisuaren_kodigoa"
                                    id="kodigoa"
                                    value={data.pisuaren_kodigoa}
                                    onChange={(e) => setData('pisuaren_kodigoa', e.target.value)}
                                    required
                                    className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 text-black shadow-sm"
                                />
                                {errors.pisuaren_kodigoa && (
                                    <p className="text-red-500 text-sm mt-1">{errors.pisuaren_kodigoa}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-4 w-full text-lg py-3 rounded-xl hover:opacity-90 transition shadow-md text-white font-semibold disabled:opacity-70 flex justify-center items-center"
                                style={{ backgroundColor: customGreen }}
                            >
                                {processing ? 'Gordetzen...' : 'Gorde Odoon'}
                            </button>
                        </form>
                    </div>
                </main>
                <footer className="w-full py-6 text-center text-white text-sm font-medium mt-auto" style={{ backgroundColor: customGreen }}>
                    © 2025 Pisukide. Eskubide guztiak erreserbatuta
                </footer>
            </div>
        </>
    );
}
