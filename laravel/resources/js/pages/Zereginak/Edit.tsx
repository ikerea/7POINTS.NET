import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// --- CONST ETA ESTILOAK  ---
const customGreen = '#00796B';
const backgroundColor = '#f3f4f6';


// --- INTERFAZEAK (DATU MOTAK) ---
interface Pisua {
    id: number;
    izena: string;
}

interface Pivot {
    hasiera_data: string;
}

interface Erabiltzailea {
    id: number;
    pivot: Pivot;
}

interface Zeregina {
    id: number;
    izena: string;
    deskripzioa: string;
    pisua_id: number;
    egoera: 'egiteko' | 'egiten' | 'eginda';
    erabiltzaileak: Erabiltzailea[];
}

interface Props {
    auth: any;
    zereginak: Zeregina;
    pisuak: Pisua[];
}

// --- EDIT KONPONENTEA ---
export default function Edit({ zereginak, pisuak }: Props) {

    // 1. DATA LORTZEKO LOGIKA
    // Zereginak erabiltzailerik esleituta badu, data 'pivot' taulatik ateratzen dugu.
    // Bestela, hutsik uzten dugu.
    const currentData = (zereginak.erabiltzaileak && zereginak.erabiltzaileak.length > 0)
        ? zereginak.erabiltzaileak[0].pivot.hasiera_data
        : '';

    // 2. FORMULARIOAREN KUDEAKETA, datuen hasierako balioak ezartzen da.
    const { data, setData, put, processing, errors } = useForm({
        izena: zereginak.izena || '',
        deskripzioa: zereginak.deskripzioa || '',
        pisua_id: zereginak.pisua_id || '',
        egoera: zereginak.egoera || 'egiteko',
        hasiera_data: currentData,
    });

    // 3. FORMULARIOA BIDALTZEKO FUNTZIOA, 'put' metodoa datuak kargatzeko
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/zereginak/${zereginak.id}`);
    };
    return (
        <AppLayout>
            <Head title="Zeregina editatu" />

            {/* EDUKIAREN EDUKIONTZIA*/}
            <div
                className="py-12 flex justify-center min-h-screen"
                style={{ backgroundColor: backgroundColor }}
            >

                <div className="w-full max-w-lg sm:px-6 lg:px-8">
                    {/* TXARTELA */}
                    <div className="bg-white overflow-hidden shadow-xl rounded-3xl p-8 md:p-10 border border-gray-100">

                        {/* IZENBURUA */}
                        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
                            Zeregina editatu
                        </h2>

                        {/* LERRO DEKORATIBOA (Izenburuaren azpian) */}
                        <div className="w-32 h-[3px] bg-gray-400 mx-auto rounded-full mb-8"></div>

                        {/* FORMULARIOA HASI */}
                        <form onSubmit={submit} className="flex flex-col gap-5">

                           {/* --- IZENA EREMUA --- */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="izena">
                                    Izena
                                </label>
                                <input
                                    id="izena"
                                    type="text"
                                    value={data.izena}
                                    onChange={(e) => setData('izena', e.target.value)}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm transition-all"
                                    placeholder="Zereginaren izena..."
                                />
                                {/* Errore mezua */}
                                {errors.izena && <div className="text-red-500 text-sm mt-1 ml-1">{errors.izena}</div>}
                            </div>

                           {/* --- DESKRIPZIOA EREMUA --- */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="deskripzioa">
                                    Deskripzioa
                                </label>
                                <textarea
                                    id="deskripzioa"
                                    value={data.deskripzioa}
                                    onChange={(e) => setData('deskripzioa', e.target.value)}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm min-h-[100px] transition-all"
                                    placeholder="Zereginaren azalpena..."
                                />
                                {errors.deskripzioa && <div className="text-red-500 text-sm mt-1 ml-1">{errors.deskripzioa}</div>}
                            </div>

                           {/* --- PISUA AUKERATZEKO EREMUA (SELECT erabiliz) --- */}
                            <div className="grid gap-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="pisua_id">
                                    Pisua
                                </label>
                                <select
                                    id="pisua_id"
                                    value={data.pisua_id}
                                    onChange={(e) => setData('pisua_id', e.target.value)}
                                    className="border-gray-300 focus:border-teal-700 focus:ring-teal-700 rounded-xl w-full py-3 px-4 text-gray-800 shadow-sm bg-white transition-all cursor-pointer"
                                >
                                    <option value="">-- Aukeratu --</option>
                                    {/* Pisuak map funtzioarekin zerrendatu */}
                                    {pisuak.map((piso) => (
                                        <option key={piso.id} value={piso.id}>
                                            {piso.izena}
                                        </option>
                                    ))}
                                </select>
                                {errors.pisua_id && <div className="text-red-500 text-sm mt-1 ml-1">{errors.pisua_id}</div>}
                            </div>

                            {/* --- DATA EREMUA --- */}
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

                           {/* --- EGOERA AUKERATZEKO EREMUA --- */}
                            <div className="grid gap-2 mt-2">
                                <label className="block text-gray-600 font-medium ml-1" htmlFor="egoera">
                                    Egoera
                                </label>
                                <select
                                    id="egoera"
                                    value={data.egoera}
                                    onChange={(e) => setData('egoera', e.target.value as any)}
                                    // Koloreak egoeraren arabera aldatzen dira
                                    className={`border-gray-300 focus:ring-2 rounded-xl w-full py-3 px-4 shadow-sm font-medium cursor-pointer transition-all
                                        ${data.egoera === 'egiteko' ? 'text-red-700 bg-red-50 border-red-200 focus:ring-red-200' : ''}
                                        ${data.egoera === 'egiten' ? 'text-blue-700 bg-blue-50 border-blue-200 focus:ring-blue-200' : ''}
                                        ${data.egoera === 'eginda' ? 'text-green-700 bg-green-50 border-green-200 focus:ring-green-200' : ''}
                                    `}
                                >
                                    <option value="egiteko">Egiteko</option>
                                    <option value="egiten">Egiten</option>
                                    <option value="eginda">Eginda</option>
                                </select>
                            </div>

                            {/* --- BOTOIAK --- */}
                            <div className="flex flex-col gap-3 mt-6">

                                {/* GORDE BOTOIA */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    style={{ backgroundColor: customGreen }}
                                    className="w-full text-white font-bold py-4 px-6 rounded-xl shadow-md hover:opacity-90 transition transform hover:-translate-y-0.5 text-lg"
                                >
                                    Zeregina gorde
                                </button>

                                {/* EZEZTATU ESTEKA */}
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
