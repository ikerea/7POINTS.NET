import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

// Interfaces
interface Pisua {
    id: number;
    izena: string;
    kodigoa: string;
}

interface EditProps {
    pisua: Pisua;
}

const customGreen = '#00796B';

export default function Edit({ pisua }: EditProps) {
    // Inertia useForm datuak kudeatzeko
    const { data, setData, put, processing, errors } = useForm({
        pisuaren_izena: pisua.izena || '',
        pisuaren_kodigoa: pisua.kodigoa || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // URL eraikuntza
        const url = `/pisua/${pisua.id}`;
        put(url);
    };

    return (
        <>
            <Head title="Editatu Pisua" />
            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>
                <header className="w-full py-5 shadow-md" style={{ backgroundColor: customGreen }}>
                    <div className="max-w-4xl mx-auto px-6 text-white flex items-center justify-between text-lg font-medium">
                        <Link href="/dashboard" className="font-bold hover:opacity-80 transition">
                            PISUKIDE
                        </Link>
                    </div>
                </header>
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10 md:p-12">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                            Editatu Pisua
                        </h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <label
                                    htmlFor="izena"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Pisuaren Izena
                                </label>
                                <input
                                    id="izena"
                                    type="text"
                                    value={data.pisuaren_izena}
                                    onChange={e => setData('pisuaren_izena', e.target.value)}
                                    className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-black shadow-sm"
                                />
                                {errors.pisuaren_izena && (
                                    <p className="text-red-500 text-sm mt-1">{errors.pisuaren_izena}</p>
                                )}
                            </div>
                            <div className="mt-4 flex flex-col gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full text-lg py-3 rounded-xl hover:opacity-90 transition shadow-md text-white font-semibold disabled:opacity-70 flex justify-center items-center"
                                    style={{ backgroundColor: customGreen }}
                                >
                                    {processing ? 'Gordetzen...' : 'Aldaketak Gorde'}
                                </button>
                                <Link
                                    href="/pisua/erakutsi"
                                    className="w-full text-center py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition"
                                >
                                    Utzi eta Atzera
                                </Link>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
