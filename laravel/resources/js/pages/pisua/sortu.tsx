import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function sortu() {
    // useForm hook-ak formularioaren egoera, erroreak eta bidalketa kudeatzen ditu
    const { data, setData, post, processing, errors } = useForm({
        pisuaren_izena: '',
        pisuaren_kodigoa: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Hemen zure Laravel rutara egiten duzu deia.
        // Ziggy erabiltzen baduzu: route('pisua.store')
        // Bestela, URL-a eskuz jarri:
        post('/pisua');
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <Head title="Sortu Pisua" />

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Sortu Pisua</h1>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label htmlFor="izena" className="block text-sm font-medium text-gray-700 mb-1">
                            Pisuaren Izena
                        </label>
                        <input
                            type="text"
                            name="pisuaren_izena"
                            id="izena"
                            value={data.pisuaren_izena}
                            onChange={(e) => setData('pisuaren_izena', e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {errors.pisuaren_izena && (
                            <p className="text-red-500 text-xs mt-1">{errors.pisuaren_izena}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="kodigoa" className="block text-sm font-medium text-gray-700 mb-1">
                            Pisuaren Kodigoa
                        </label>
                        <input
                            type="text"
                            name="pisuaren_kodigoa"
                            id="kodigoa"
                            value={data.pisuaren_kodigoa}
                            onChange={(e) => setData('pisuaren_kodigoa', e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {errors.pisuaren_kodigoa && (
                            <p className="text-red-500 text-xs mt-1">{errors.pisuaren_kodigoa}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
                    >
                        {processing ? 'Gordetzen...' : 'Gorde Odoon'}
                    </button>
                </form>
            </div>
        </div>
    );
}
