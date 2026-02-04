import React, { useMemo } from 'react';
import { Gasto, User } from './GastuakPage';
import { router } from '@inertiajs/react';

// 1. Definimos la interfaz para los pagos
export interface Ordainketa {
    id: number;
    piso_id: number;
    deudor_id: number;
    acreedor_id: number;
    cantidad: number;
    created_at: string;
}

interface ZergakProps {
    gastos: Gasto[];
    usuarios: User[];
    pagos: Ordainketa[]; // <--- Recibimos los pagos realizados
}

interface BalanceUsuario {
    usuario: User;
    pagado: number; // Lo gastado en compras (supermercado, etc.)
    balance: number; // Positivo = recibe, Negativo = debe (YA AJUSTADO CON PAGOS)
}

interface Transaccion {
    deudor: User;   // Quien paga
    acreedor: User; // Quien recibe
    cantidad: number;
}

function Zergak({ gastos, usuarios, pagos = [] }: ZergakProps) { // Valor por defecto [] para pagos

    // --- CÁLCULOS MATEMÁTICOS ---
    const { transacciones, balances } = useMemo(() => {
        if (usuarios.length === 0) return { transacciones: [], balances: [] };

        // 1. Inicializamos los contadores de cada usuario a 0
        // "cuotaTeorica" es lo que DEBERÍAN haber pagado según cuándo entraron
        const estadoUsuarios = new Map<number, {
            usuario: User,
            pagado: number,
            cuotaTeorica: number,
            recibidoDeOtros: number,
            entregadoAOtros: number
        }>();

        usuarios.forEach(u => {
            estadoUsuarios.set(u.id, {
                usuario: u,
                pagado: 0,
                cuotaTeorica: 0,
                recibidoDeOtros: 0,
                entregadoAOtros: 0
            });
        });

        // 2. Procesamos los PAGOS (Ordainketak)
        // Esto no cambia, es dinero directo entre personas
        pagos.forEach(p => {
            const deudor = estadoUsuarios.get(p.deudor_id);
            const acreedor = estadoUsuarios.get(p.acreedor_id);
            if (deudor) deudor.entregadoAOtros += Number(p.cantidad);
            if (acreedor) acreedor.recibidoDeOtros += Number(p.cantidad);
        });

        // 3. Procesamos los GASTOS (Uno a uno para ver quién estaba)
        gastos.forEach(gasto => {
            const importe = Number(gasto.Cantidad);
            const fechaGasto = new Date(gasto.Fecha); // Ojo: Asegúrate que Gasto.Fecha es YYYY-MM-DD
            fechaGasto.setHours(0, 0, 0, 0);



            // A. Sumamos al que pagó (pone el dinero)
            const pagador = estadoUsuarios.get(gasto.IdUsuario);
            if (pagador) {
                pagador.pagado += importe;
            }

            // B. Calculamos quiénes estaban en el piso en esa fecha
            const inquilinosEnEsaFecha = usuarios.filter(u => {
                // Si no tiene pivot (raro), asumimos que estaba.
                // Si tiene, comparamos fechas.
                if (!u.pivot?.created_at) return true;

                const fechaEntrada = new Date(u.pivot.created_at);
                fechaEntrada.setHours(0, 0, 0, 0);

                // Truco: Quitamos las horas para comparar solo días si es necesario,
                // pero por seguridad comparamos timestamps.
                // Si la fecha del gasto es POSTERIOR o IGUAL a la entrada, paga.
                return fechaGasto >= fechaEntrada;
            });

            // C. Dividimos SOLO entre los presentes
            if (inquilinosEnEsaFecha.length > 0) {
                const cuotaIndividual = importe / inquilinosEnEsaFecha.length;

                inquilinosEnEsaFecha.forEach(inquilino => {
                    const estado = estadoUsuarios.get(inquilino.id);
                    if (estado) {
                        estado.cuotaTeorica += cuotaIndividual;
                    }
                });
            }else {
                // Asignarlo al pagador como si fuera un gasto personal
                if (pagador) {
                    pagador.cuotaTeorica += importe;
                }
            }
        });

        // 4. Convertimos el Map a Array y calculamos el Balance Final
        const listaBalances: BalanceUsuario[] = Array.from(estadoUsuarios.values()).map(e => {
            // FÓRMULA:
            // Lo que puse (Compras + Pagos a otros) - Lo que me dieron - Lo que DEBERÍA haber pagado
            const aportacionReal = e.pagado + e.entregadoAOtros - e.recibidoDeOtros;
            const balanceFinal = aportacionReal - e.cuotaTeorica;

            return {
                usuario: e.usuario,
                pagado: e.pagado,
                balance: balanceFinal
            };
        });

        // 5. Algoritmo de repartición de deudas (Idéntico al anterior)
        let deudores = listaBalances.filter(b => b.balance < -0.01).sort((a, b) => a.balance - b.balance);
        let acreedores = listaBalances.filter(b => b.balance > 0.01).sort((a, b) => b.balance - a.balance);

        const listaTransacciones: Transaccion[] = [];
        let saldosDeudores = deudores.map(d => ({ ...d }));
        let saldosAcreedores = acreedores.map(a => ({ ...a }));
        let x = 0; let y = 0;

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

    }, [gastos, usuarios, pagos]);

    // --- MANEJADOR DEL BOTÓN ---
    const handleSaldarDeuda = (deudorId: number, acreedorId: number, cantidad: number) => {
        if (confirm(`Ziur zaude zorra kitatu dela (${cantidad.toFixed(2)}€)?`)) {
            router.post('/pagos/saldar', {
                deudor_id: deudorId,
                acreedor_id: acreedorId,
                cantidad: cantidad
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    // Opcional: Mostrar notificación de éxito
                }
            });
        }
    };

    // --- RENDERIZADO ---

    if (usuarios.length === 0) return (
        <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
            Ez daude erabiltzailerik pisuan.
        </div>
    );
    // Nota: Quitamos el return si gastos es 0, porque puede haber pagos pendientes aunque no haya gastos nuevos.

    return (
        <div className="flex flex-col gap-10 max-w-4xl mx-auto p-2 sm:p-4">

            {/* SECCIÓN 1: EGOERA OROKORRA */}
            <section>
                <div className="mb-6 pb-2 border-b border-gray-200">
                    <h4 className="text-2xl font-bold text-gray-800">Egoera Orokorra</h4>
                    <p className="text-sm text-gray-500 mt-1">Norberaren balantzea (dagoeneko ordaindutakoa kontuan hartuta)</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {balances.map((b) => {
                        // Tolerancia pequeña para mostrar 0 en vez de -0.00
                        const balanceMostrado = Math.abs(b.balance) < 0.005 ? 0 : b.balance;
                        const esPositivo = balanceMostrado >= 0;
                        const esCero = balanceMostrado === 0;

                        // Colores
                        let colorClase = 'text-gray-600';
                        let bgClase = 'bg-gray-50 border-gray-100';
                        let textoEstado = 'Egonkor';

                        if (!esCero) {
                            colorClase = esPositivo ? 'text-teal-700' : 'text-red-600';
                            bgClase = esPositivo ? 'bg-teal-50 border-teal-100' : 'bg-red-50 border-red-100';
                            textoEstado = esPositivo ? 'Jasotzeko' : 'Ordaintzeko';
                        }

                        return (
                            <div
                                key={`bal-${b.usuario.id}`}
                                className={`relative p-5 rounded-2xl border ${bgClase} shadow-sm flex justify-between items-center transition-transform hover:-translate-y-1`}
                            >
                                {/* Izquierda: Info Usuario */}
                                <div>
                                    <h6 className="text-lg font-bold text-gray-800">{b.usuario.name}</h6>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Gastua erosketetan: <span className="font-medium text-gray-700">{b.pagado.toFixed(2)}€</span>
                                    </p>
                                </div>

                                {/* Derecha: Balance */}
                                <div className="text-right">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${colorClase} opacity-80`}>
                                        {textoEstado}
                                    </span>
                                    <h3 className={`text-2xl font-extrabold ${colorClase}`}>
                                        {Math.abs(balanceMostrado).toFixed(2)} €
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* SECCIÓN 2: ORDAINKETAK (Deudas pendientes) */}
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
                                className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border-l-[6px] border-l-red-500"
                            >

                                {/* Info Transacción */}
                                <div className="flex flex-wrap items-center justify-center gap-3 text-lg w-full sm:w-auto">
                                    <span className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                                        {t.deudor.name}
                                    </span>

                                    {/* Flecha */}
                                    <div className="flex flex-col items-center text-gray-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                    </div>

                                    <span className="font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-lg">
                                        {t.acreedor.name}
                                    </span>
                                </div>

                                {/* Derecha: Cantidad y Botón */}
                                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-end">
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {t.cantidad.toFixed(2)} €
                                    </h3>

                                    {/* BOTÓN NUEVO: Ordainduta */}
                                    <button
                                        onClick={() => handleSaldarDeuda(t.deudor.id, t.acreedor.id, t.cantidad)}
                                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                                        title="Markatu ordainduta bezala"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        Ordainduta
                                    </button>
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
