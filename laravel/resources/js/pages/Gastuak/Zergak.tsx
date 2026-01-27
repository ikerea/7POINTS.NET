import React, { useMemo } from 'react';
// Reutilizamos el mismo CSS para que se vea igual
import './gastosCSS.css'; 
import { Gasto, User } from './GastuakPage'; // Asegúrate de importar las interfaces

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

    // --- CÁLCULOS MATEMÁTICOS (useMemo para eficiencia) ---
    const { transacciones, balances } = useMemo(() => {
        if (usuarios.length === 0) return { transacciones: [], balances: [] };

        // 1. Calcular total gastado por cada usuario
        const totalGasto = gastos.reduce((acc, g) => acc + Number(g.Cantidad), 0);
        const cuotaPorPersona = totalGasto / usuarios.length;

        // 2. Calcular balances individuales
        const listaBalances: BalanceUsuario[] = usuarios.map(u => {
            // Sumar todo lo que ha pagado este usuario (ojo con los tipos string/number)
            const loQueHaPagado = gastos
                .filter(g => g.IdUsuario === u.id)
                .reduce((acc, g) => acc + Number(g.Cantidad), 0);

            return {
                usuario: u,
                pagado: loQueHaPagado,
                balance: loQueHaPagado - cuotaPorPersona
            };
        });

        // 3. Algoritmo para saldar deudas (Quién paga a quién)
        // Separamos en deudores (balance < 0) y acreedores (balance > 0)
        let deudores = listaBalances.filter(b => b.balance < -0.01).sort((a, b) => a.balance - b.balance);
        let acreedores = listaBalances.filter(b => b.balance > 0.01).sort((a, b) => b.balance - a.balance);

        const listaTransacciones: Transaccion[] = [];

        let i = 0; // índice deudores
        let j = 0; // índice acreedores

        while (i < deudores.length && j < acreedores.length) {
            const deudor = deudores[i];
            const acreedor = acreedores[j];

            // La cantidad a pagar es el mínimo entre lo que debe uno y lo que le deben al otro
            const monto = Math.min(Math.abs(deudor.balance), acreedor.balance);

            listaTransacciones.push({
                deudor: deudor.usuario,
                acreedor: acreedor.usuario,
                cantidad: monto
            });

            // Ajustamos balances temporales
            deudor.balance += monto;
            acreedor.balance -= monto;

            // Avanzamos índices si ya se ha saldado
            if (Math.abs(deudor.balance) < 0.01) i++;
            if (acreedor.balance < 0.01) j++;
        }

        return { transacciones: listaTransacciones, balances: listaBalances };

    }, [gastos, usuarios]);

    // --- RENDERIZADO ---
    if (usuarios.length === 0) return <div className="divPadre"><p style={{padding: 20}}>Ez daude erabiltzailerik pisuan.</p></div>;
    if (gastos.length === 0) return <div className="divPadre"><p style={{padding: 20}}>Ez daude gasturik kalkulatzeko.</p></div>;

    return (
        <div className="divPadre">
            
            {/* SECCIÓN 1: RESUMEN (OPCIONAL, SI QUIERES VER ESTADO DE CADA UNO) */}
            {/* Puedes quitar esto si solo quieres ver los pagos finales */}
            <div style={{ padding: '0 10px', marginBottom: '10px' }}>
                <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc' }}>Egoera Orokorra</h4>
            </div>

            {balances.map((b) => (
                <div className="divHijos" key={`bal-${b.usuario.id}`} style={{ backgroundColor: '#f9f9f9' }}>
                    <div className="divNombreYGastoNombre">
                        <h6>{b.usuario.name}</h6>
                        <p>Pagado: {b.pagado.toFixed(2)}€</p>
                    </div>
                    <div className="divDerecha">
                        <h3 style={{ color: b.balance >= 0 ? 'green' : 'red' }}>
                            {b.balance >= 0 ? '+' : ''}{b.balance.toFixed(2)} €
                        </h3>
                    </div>
                </div>
            ))}

            <div style={{ padding: '10px', marginTop: '10px' }}>
                <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc' }}>Ordainketak (Settlement)</h4>
            </div>

            {/* SECCIÓN 2: PAGOS NECESARIOS (LO QUE IMPORTA) */}
            {transacciones.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'green', padding: '10px' }}>Dena ordainduta dago! ✅</p>
            ) : (
                transacciones.map((t, index) => (
                    <div className="divHijos" key={index} style={{ borderColor: '#16655D' }}>
                        
                        {/* ZONA 1: QUIÉN PAGA A QUIÉN */}
                        <div className="divNombreYGastoNombre">
                            <h6 style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span style={{color: '#d9534f', fontWeight: 'bold'}}>{t.deudor.name}</span>
                                <span>➝</span>
                                <span style={{color: '#16655D', fontWeight: 'bold'}}>{t.acreedor.name}</span>
                            </h6>
                            <p>Zorren kitatzea</p>
                        </div>
                        
                        {/* ZONA 2: CANTIDAD */}
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