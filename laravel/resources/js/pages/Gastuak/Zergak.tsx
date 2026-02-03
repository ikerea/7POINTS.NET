import React, { useMemo } from 'react';
import { Gasto, User } from './GastuakPage';

interface ZergakProps {
    gastos: Gasto[];
    usuarios: User[];
}

interface BalanceUsuario {
    usuario: User;
    pagado: number;
    balance: number; // Positivo = recibe, Negativo = debe
}

interface Transaccion {
    deudor: User;   // Quien paga
    acreedor: User; // Quien recibe
    cantidad: number;
}

function Zergak({ gastos, usuarios }: ZergakProps) {

    // --- CÁLCULOS MATEMÁTICOS (Sin cambios en la lógica) ---
    const { transacciones, balances } = useMemo(() => {
        if (usuarios.length === 0) return { transacciones: [], balances: [] };

        // 1. Calcular total gastado y cuota
        const totalGasto = gastos.reduce((acc, g) => acc + Number(g.Cantidad), 0);
        const cuotaPorPersona = totalGasto / usuarios.length;

        // 2. Calcular balances individuales
        const listaBalances: BalanceUsuario[] = usuarios.map(u => {
            const loQueHaPagado = gastos
                .filter(g => g.IdUsuario === u.id)
                .reduce((acc, g) => acc + Number(g.Cantidad), 0);

            return {
                usuario: u,
                pagado: loQueHaPagado,
                balance: loQueHaPagado - cuotaPorPersona
            };
        });

        // 3. Algoritmo para saldar deudas
        let deudores = listaBalances.filter(b => b.balance < -0.01).sort((a, b) => a.balance - b.balance);
        let acreedores = listaBalances.filter(b => b.balance > 0.01).sort((a, b) => b.balance - a.balance);

        const listaTransacciones: Transaccion[] = [];

        let saldosDeudores = deudores.map(d => ({ ...d }));
        let saldosAcreedores = acreedores.map(a => ({ ...a }));

        let x = 0;
        let y = 0;

        while (x < saldosDeudores.length && y < saldosAcreedores.length) {
            const deudor = saldosDeudores[x];
            const acreedor = saldosAcreedores[y];

            const monto = Math.min(Math.abs(deudor.balance), acreedor.balance);

            listaTransacciones.push({
                deudor: deudor.usuario,
                acreedor: acreedor.usuario,
                cantidad: monto
            });

            deudor.balance += monto;
            acreedor.balance -= monto;

            if (Math.abs(deudor.balance) < 0.01) x++;
            if (acreedor.balance < 0.01) y++;
        }

        return { transacciones: listaTransacciones, balances: listaBalances };

    }, [gastos, usuarios]);

    // --- RENDERIZADO ---

    // Mensajes vacíos con estilo limpio
    if (usuarios.length === 0) return (
        <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
            Ez daude erabiltzailerik pisuan.
        </div>
    );
    if (gastos.length === 0) return (
        <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
            Ez daude gasturik kalkulatzeko.
        </div>
    );

    return (
        <div className="flex flex-col gap-10 max-w-4xl mx-auto p-2 sm:p-4">

            {/* SECCIÓN 1: EGOERA OROKORRA */}
            <section>
                <div className="mb-6 pb-2 border-b border-gray-200">
                    <h4 className="text-2xl font-bold text-gray-800">Egoera Orokorra</h4>
                    <p className="text-sm text-gray-500 mt-1">Norberaren balantzea gastu totalen arabera</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {balances.map((b) => {
                        const esPositivo = b.balance >= 0;
                        // Colores: Verde Teal para positivo, Rojo para negativo
                        const colorClase = esPositivo ? 'text-teal-700' : 'text-red-600';
                        const bgClase = esPositivo ? 'bg-teal-50 border-teal-100' : 'bg-red-50 border-red-100';
                        const textoEstado = esPositivo ? 'Jasotzeko' : 'Ordaintzeko';
                        const icono = esPositivo ? '+' : '-';

                        return (
                            <div
                                key={`bal-${b.usuario.id}`}
                                className={`relative p-5 rounded-2xl border ${bgClase} shadow-sm flex justify-between items-center transition-transform hover:-translate-y-1`}
                            >

                                {/* Izquierda: Info Usuario */}
                                <div>
                                    <h6 className="text-lg font-bold text-gray-800">{b.usuario.name}</h6>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Jarritakoa: <span className="font-medium text-gray-700">{b.pagado.toFixed(2)}€</span>
                                    </p>
                                </div>

                                {/* Derecha: Balance */}
                                <div className="text-right">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${colorClase} opacity-80`}>
                                        {textoEstado}
                                    </span>
                                    <h3 className={`text-2xl font-extrabold ${colorClase}`}>
                                        {Math.abs(b.balance).toFixed(2)} €
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* SECCIÓN 2: ORDAINKETAK */}
            <section>
                <div className="mb-6 pb-2 border-b border-gray-200">
                    <h4 className="text-2xl font-bold text-gray-800">Ordainketak</h4>
                    <p className="text-sm text-gray-500 mt-1">Zorrak kitatzeko egin beharreko transferentziak</p>
                </div>

                {transacciones.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-dashed border-teal-200 text-teal-700 shadow-sm">
                        <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-lg font-bold">Dena koadratuta dago!</p>
                        <p className="text-sm opacity-75">Ez dago zorrik erabiltzaileen artean.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {transacciones.map((t, index) => (
                            <div
                                key={index}
                                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border-l-[6px] border-l-teal-700"
                            >

                                {/* Detalle Transacción */}
                                <div className="flex items-center gap-4 text-lg">
                                    <span className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                                        {t.deudor.name}
                                    </span>

                                    {/* Flecha animada */}
                                    <div className="flex flex-col items-center text-gray-300">
                                        <span className="text-xs font-medium text-gray-400 mb-[-5px]">Ordaindu</span>
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </div>

                                    <span className="font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-lg">
                                        {t.acreedor.name}
                                    </span>
                                </div>

                                {/* Cantidad */}
                                <div className="flex items-center gap-2">
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {t.cantidad.toFixed(2)} €
                                    </h3>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Zergak;
