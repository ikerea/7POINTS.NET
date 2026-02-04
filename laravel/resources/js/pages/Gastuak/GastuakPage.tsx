import { useState } from 'react';
import { router, Link, Head } from '@inertiajs/react';
import Gastos from './Gastos';
import Zergak from './Zergak';
import AppLayout from '@/layouts/app-layout';

// Iconos
import {
    Wallet,
    PiggyBank,
    Filter,
    Plus,
    Euro,
    Calendar
} from 'lucide-react';

// --- INTERFACES ---
export interface User {
    id: number;
    name: string;
    email: string;
    pivot?: {
        piso_id: number;
        user_id: number;
        mota: string;
        created_at: string;
    };
}

export interface Gasto {
    IdGasto: number;
    Nombre: string;
    IdUsuario: number;
    IdPiso: number;
    Cantidad: number;
    created_at: string;
    updated_at: string;
    usuario?: User;
}

export interface Piso {
    id: number;
    izena: string;
    kodigoa: string;
    user_id: number;
    inquilinos?: User[];
    gastos?: Gasto[];
    ordainketak?: any[];
}

interface Props {
    piso: Piso;
    auth: { user: User };
    filters?: { fecha: string | null };
}

const GastuakPage = ({ piso, auth, filters }: Props) => {
    // --- ESTADO ---
    const [activeTab, setActiveTab] = useState<'gastuak' | 'zergak'>('gastuak');

    const listaGastos = piso.gastos || [];
    const listaInquilinos = piso.inquilinos || [];

    const usuariosMap = new Map<number, string>(
        listaInquilinos.map(user => [user.id, user.name])
    );

    // Filtro de fecha
    const [fecha, setFecha] = useState(filters?.fecha || '');

    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevaFecha = e.target.value;
        setFecha(nuevaFecha);

        router.get(
            `/gastos/${piso.id}/${auth.user.id}`,
            { fecha: nuevaFecha },
            { preserveState: true, preserveScroll: true }
        );
    };

    // Cálculos
    const totalGuztira = listaGastos.reduce((acc, g) => acc + Number(g.Cantidad), 0);
    const misGastos = listaGastos.filter(g => g.IdUsuario === auth.user.id);
    const totalNire = misGastos.reduce((acc, g) => acc + Number(g.Cantidad), 0);

    // Handlers
    const handleDeleteGasto = (id: number) => {
        if (confirm('Ziur zaude gastu hau ezabatu nahi duzula?')) {
            router.delete(`/gastos/deleteGasto/${id}`);
        }
    };

    const handleEditGasto = (gasto: Gasto) => {
        console.log("Editar", gasto);
        // router.get(`/gastuak/${gasto.IdGasto}/edit`);
    };

    return (
        <AppLayout>
            <Head title="Gastuak" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">

                    {/* --- 1. TÍTULO (Centrado pero con estilo original) --- */}
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                            Gastuak
                        </h1>
                        <div className="h-1 w-16 bg-[#00796B] rounded-full mt-2"></div>
                    </div>

                    {/* --- 2. TABS (Centradas, estilo cápsula original) --- */}
                    <div className="flex justify-center mb-8">
                        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200">
                            <button
                                onClick={() => setActiveTab('gastuak')}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                                    activeTab === 'gastuak'
                                        ? 'bg-[#00796B] text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Euro className="w-4 h-4" />
                                Gastuak
                            </button>
                            <button
                                onClick={() => setActiveTab('zergak')}
                                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                                    activeTab === 'zergak'
                                        ? 'bg-[#00796B] text-white shadow-md'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <PiggyBank className="w-4 h-4" />
                                Zergak
                            </button>
                        </div>
                    </div>

                    {/* --- 3. CONTROLES (Fila: Filtro Izq - Botón Der) --- */}
                    <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 gap-4">

                        {/* Filtro Fecha (Estilo Input Original) */}
                        <div className="relative group w-full sm:w-auto">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-hover:text-[#00796B] transition-colors" />
                            <input
                                type="month"
                                value={fecha}
                                onChange={handleFechaChange}
                                className="pl-10 pr-8 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#00796B] focus:border-[#00796B] transition-all text-sm shadow-sm w-full sm:w-48 bg-white"
                                placeholder="Data..."
                            />
                            {fecha && (
                                <button
                                    onClick={() => {
                                        setFecha('');
                                        router.get(`/gastos/${piso.id}/${auth.user.id}`);
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Botón Gastu Berria (Estilo Botón Original) */}
                        <Link
                            href={'/gastuak/ikusi'}
                            className="w-full sm:w-auto bg-[#00796B] hover:bg-[#004D40] text-white font-bold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Gastu Berria</span>
                        </Link>
                    </div>

                    {/* --- 4. CAJA PRINCIPAL (Lista con estilo Tarjeta Limpia) --- */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 min-h-[500px] relative overflow-hidden">
                        {/* Decoración sutil fondo */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00796B] to-transparent opacity-50"></div>

                        {listaGastos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-80 text-center">
                                <div className="p-4 bg-gray-50 rounded-full mb-4">
                                    <Wallet className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Ez dago gasturik</h3>
                                <p className="text-gray-500 mt-1">Hasi gastu berri bat gehitzen goiko botoian.</p>
                            </div>
                        ) : (
                            <>
                                {activeTab === 'gastuak' ? (
                                    <div className="animate-fade-in">
                                        <Gastos
                                            gastos={listaGastos}
                                            onDelete={handleDeleteGasto}
                                            onEdit={handleEditGasto}
                                            usuariosMap={usuariosMap}
                                        />
                                    </div>
                                ) : (
                                    <div className="animate-fade-in">
                                        <Zergak
                                            gastos={listaGastos}
                                            usuarios={listaInquilinos}
                                            pagos={piso.ordainketak || []}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* --- 5. FOOTER (Totales en Texto Grande) --- */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 px-4">
                        <div className="flex flex-col sm:items-start items-center mb-4 sm:mb-0">
                            <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Nire ekarpena</span>
                            <span className="text-3xl font-bold text-[#00796B]">{totalNire.toFixed(2)}€</span>
                        </div>
                        <div className="flex flex-col sm:items-end items-center">
                            <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Guztira (Pisu osoa)</span>
                            <span className="text-3xl font-bold text-gray-800">{totalGuztira.toFixed(2)}€</span>
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
};

export default GastuakPage;
