import React, { useMemo } from 'react';
import './gastosCSS.css'; 
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

    // --- CÁLCULOS MATEMÁTICOS ---
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
        let i = 0; 
        let j = 0; 

        // Clonamos balances para no mutar el original en el cálculo de transacciones
        // (Aunque en JS objetos son ref, aquí modificamos solo props numéricas para el algoritmo)
        // Nota: para visualización usamos 'listaBalances' original intacta, 
        // pero necesitamos los valores mutables para calcular los pagos.
        
        // *Corrección para el algoritmo*: Usamos copias simples de los valores de balance para el loop
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
    if (usuarios.length === 0) return <div className="divPadre"><p style={{padding: 20}}>Ez daude erabiltzailerik pisuan.</p></div>;
    if (gastos.length === 0) return <div className="divPadre"><p style={{padding: 20}}>Ez daude gasturik kalkulatzeko.</p></div>;

    return (
        <div className="divPadre">
            
            {/* SECCIÓN 1: EGOERA OROKORRA (ACTUALIZADA) */}
            <div style={{ padding: '0 10px', marginBottom: '10px' }}>
                <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc' }}>Egoera Orokorra</h4>
            </div>

            {balances.map((b) => {
                const esPositivo = b.balance >= 0;
                // Definimos color y texto según el estado
                const colorEstado = esPositivo ? '#16655D' : '#d9534f'; // Verde Teal o Rojo
                const textoEstado = esPositivo ? 'Jasotzeko' : 'Ordaintzeko';

                return (
                    <div className="divHijos" key={`bal-${b.usuario.id}`} style={{ backgroundColor: '#f9f9f9' }}>
                        
                        {/* Izquierda: Nombre y lo pagado */}
                        <div className="divNombreYGastoNombre">
                            <h6>{b.usuario.name}</h6>
                            <p style={{ fontSize: '0.8rem', color: '#666' }}>
                                Jarritakoa: {b.pagado.toFixed(2)}€
                            </p>
                        </div>

                        {/* Derecha: Estado explícito */}
                        {/* Usamos flexDirection column para poner texto encima del número */}
                        <div className="divDerecha" style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                            <span style={{ 
                                fontSize: '0.8rem', 
                                fontWeight: 'bold', 
                                color: colorEstado,
                                textTransform: 'uppercase'
                            }}>
                                {textoEstado}
                            </span>
                            <h3 style={{ color: colorEstado, margin: 0 }}>
                                {Math.abs(b.balance).toFixed(2)} €
                            </h3>
                        </div>
                    </div>
                );
            })}

            {/* SECCIÓN 2: ORDAINKETAK */}
            <div style={{ padding: '10px', marginTop: '10px' }}>
                <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc' }}>Ordainketak</h4>
            </div>

            {transacciones.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#16655D', padding: '10px', fontWeight: 'bold' }}>
                    Dena koadratuta dago! 
                </p>
            ) : (
                transacciones.map((t, index) => (
                    <div className="divHijos" key={index} style={{ borderColor: '#16655D', borderLeftWidth: '5px' }}>
                        
                        <div className="divNombreYGastoNombre">
                            <h6 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                                <span style={{color: '#d9534f', fontWeight: 'bold'}}>{t.deudor.name}</span>
                                <span style={{fontSize: '1.2rem'}}>➝</span>
                                <span style={{color: '#16655D', fontWeight: 'bold'}}>{t.acreedor.name}</span>
                            </h6>
                            <p style={{fontSize: '0.8rem'}}>Zorren kitatzea</p>
                        </div>
                        
                        <div className="divDerecha">
                            <h3>{t.cantidad.toFixed(2)} €</h3>
                        </div>

                    </div>
                ))
            )}
        </div>
    );
}

export default Zergak;