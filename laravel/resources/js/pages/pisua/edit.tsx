import React from 'react';
import { useForm, Link } from '@inertiajs/react';

interface Pisua {
    id: number;
    izena: string;
    kodigoa: string;
}

interface EditProps {
    pisua: Pisua;
}

export default function Edit({ pisua }: EditProps) {
    // Inertia useForm erabiltzen dugu datuak kudeatzeko
    // 'pisuaren_izena' eta 'pisuaren_kodigoa' erabiltzen ditugu, Controller-ak horrela espero duelako
    const { data, setData, put, processing, errors } = useForm({
        pisuaren_izena: pisua.izena || '',
        pisuaren_kodigoa: pisua.kodigoa || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = `/pisua/${pisua.id}`;
         console.log("BIDALIKO DEN URL-A:", url);
        put(url);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Editatu Pisua</h1>

            <form onSubmit={handleSubmit}>
                {/* Pisuaren Izena Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="izena">
                        Pisuaren Izena
                    </label>
                    <input
                        id="izena"
                        type="text"
                        value={data.pisuaren_izena}
                        onChange={e => setData('pisuaren_izena', e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.pisuaren_izena ? 'border-red-500' : ''}`}
                    />
                    {errors.pisuaren_izena && <div className="text-red-500 text-xs mt-1">{errors.pisuaren_izena}</div>}
                </div>

                {/* Pisuaren Kodigoa Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kodigoa">
                        Pisuaren Kodigoa
                    </label>
                    <input
                        id="kodigoa"
                        type="text"
                        value={data.pisuaren_kodigoa}
                        onChange={e => setData('pisuaren_kodigoa', e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.pisuaren_kodigoa ? 'border-red-500' : ''}`}
                    />
                    {errors.pisuaren_kodigoa && <div className="text-red-500 text-xs mt-1">{errors.pisuaren_kodigoa}</div>}
                </div>

                {/* Ekintza Botoiak */}
                <div className="flex items-center justify-between">
                    <Link
                        href={'pisua.show'}
                        className="text-gray-500 hover:text-gray-700 font-bold transition duration-150 ease-in-out"
                    >
                        Atzera
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-150 ease-in-out"
                    >
                        {processing ? 'Gordetzen...' : 'Aldaketak Gorde'}
                    </button>
                </div>
            </form>
        </div>
    );
}
