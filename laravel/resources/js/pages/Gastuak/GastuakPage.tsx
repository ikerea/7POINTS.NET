import { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import Gastos from './Gastos'; 
import './GastuakPage.css';
import AppLayout from '@/layouts/app-layout';
import Zergak from './Zergak';

// --- INTERFACES ---

export interface User {
    id: number;
    name: string;
    email: string;
    pivot?: {
        piso_id: number;
        user_id: number;
        mota: string;
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
    usuario?: User; // El autor del gasto
}

export interface Piso {
    id: number;
    izena: string;
    kodigoa: string;
    user_id: number;
    // Arrays que vienen del 'with' en Laravel
    inquilinos?: User[]; 
    gastos?: Gasto[];    
}

// --- PROPS DEL COMPONENTE ---
interface Props {
    piso: Piso;   // Recibimos el piso completo con sus relaciones
    auth: {       // Datos del usuario logueado
        user: User
    };
    // Nuevo prop para recibir el filtro desde el controlador
    filters?: {
        fecha: string | null;
    };
}

const GastuakPage = ({ piso, auth, filters }: Props) => {
    // Extraemos gastos e inquilinos del objeto piso (con valores por defecto por seguridad)
    const listaGastos = piso.gastos || [];
    const usuarioLogueado = auth?.user;
    const listaInquilinos = piso.inquilinos || [];

    const usuariosMap = new Map(listaInquilinos.map(u => [u.id, u.name]));

    const [activeTab, setActiveTab] = useState<string>('gastuak');
    
    // Estado para mostrar u ocultar el calendario emergente
    const [showDateInput, setShowDateInput] = useState(false);

    // --- CÁLCULOS ---
    const totalGuztira = listaGastos.reduce((acc, curr) => acc + Number(curr.Cantidad), 0);
    
    // Ahora comparamos con el ID del usuario logueado real
    const totalNire = listaGastos
        .filter(g => g.IdUsuario === usuarioLogueado?.id) 
        .reduce((acc, curr) => acc + Number(curr.Cantidad), 0);

    // --- HANDLERS ---
    const handleDeleteGasto = (id: number) => {
        if (!window.confirm("¿Seguro que quieres borrar este gasto?")) return;
        router.delete(`/gastos/deleteGasto/${id}`, { preserveScroll: true });
    };

    const handleEditGasto = (gasto: Gasto) => {
        router.get(`/gastuak/${gasto.IdGasto}/edit`);
    };

    // Handler para cuando cambias la fecha en el calendario
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fechaSeleccionada = e.target.value;
        
        // Cerramos el calendario visualmente
        setShowDateInput(false);

        router.get('/gastuak', 
            { fecha: fechaSeleccionada }, 
            { 
                preserveState: true, 
                preserveScroll: true,
                replace: true 
            }
        );
    };

    // Handler para limpiar el filtro y ver todo de nuevo
    const clearFilter = () => {
        setShowDateInput(false);
        router.get('/gastuak', {}, { preserveState: true, preserveScroll: true });
    };

    return (
        <AppLayout>
            <div className="page-wrapper">
                <main className="main-container">
                    {/* Mostramos el nombre del piso dinámicamente */}
                    <h1 className="page-title">Gastuak: {piso.izena}</h1>

                    <div className="controls-section">
                        <div className="tabs-container">
                            <div 
                                className={`tab ${activeTab === 'gastuak' ? 'active' : ''}`}
                                onClick={() => setActiveTab('gastuak')}
                            >
                                Gastuak
                            </div>
                            <div 
                                className={`tab ${activeTab === 'zergak' ? 'active' : ''}`}
                                onClick={() => setActiveTab('zergak')}
                            >
                                Zergak
                            </div>
                        </div>

                        <div className="filter-row">
                            {/* ZONA DEL FILTRO CON ESTILOS EN LÍNEA PARA EL POSICIONAMIENTO */}
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                
                                {/* Si hay un filtro aplicado, mostramos botón rojo para quitarlo */}
                                {filters?.fecha && (
                                    <button 
                                        onClick={clearFilter}
                                        title="Kendu filtroa"
                                        style={{
                                            background: '#e74c3c',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '12px'
                                        }}
                                    >
                                        ✕
                                    </button>
                                )}

                                <button 
                                    className="date-filter-btn" 
                                    onClick={() => setShowDateInput(!showDateInput)}
                                >
                                    {filters?.fecha ? `Data: ${filters.fecha}` : 'Data filtro 📅'}
                                </button>

                                {/* CALENDARIO FLOTANTE */}
                                {showDateInput && (
                                    <input 
                                        type="date" 
                                        autoFocus
                                        onChange={handleDateChange}
                                        // Valor actual o vacío
                                        value={filters?.fecha || ''}
                                        style={{
                                            position: 'absolute',
                                            top: '110%', // Justo debajo del botón
                                            left: 0,
                                            zIndex: 50,
                                            padding: '8px',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                            backgroundColor: 'white'
                                        }}
                                    />
                                )}
                            </div>

                            <div 
                                className="add-btn" 
                                onClick={() => router.visit('/gastuak/ikusi')}
                            >
                                +
                            </div>
                        </div>
                    </div>

                    <div className="contenido-centrado">
                        {/* Feedback visual si no hay resultados en esa fecha */}
                        {listaGastos.length === 0 && filters?.fecha ? (
                            <div style={{ textAlign: 'center', padding: '20px', color: '#777' }}>
                                <p>Ez da gasturik aurkitu data honetan ({filters.fecha}).</p>
                                <button 
                                    onClick={clearFilter}
                                    style={{ marginTop: '10px', textDecoration: 'underline', background: 'none', border: 'none', color: '#00796B', cursor: 'pointer' }}
                                >
                                    Ikusi gastu guztiak
                                </button>
                            </div>
                        ) : (
                            activeTab === 'gastuak' ? (
                                <Gastos 
                                    gastos={listaGastos} 
                                    onDelete={handleDeleteGasto}
                                    onEdit={handleEditGasto}
                                    usuariosMap={usuariosMap}
                                />
                            ) :(
                                <>
                                    <Zergak 
                                        gastos={listaGastos} 
                                        usuarios={listaInquilinos} 
                                    />                                
                                </>

                            )

                        )}
                    </div>

                    <div className="totals-section">
                        <span>Nire gastuak: {totalNire.toFixed(2)}€</span>
                        <span>Guztira: {totalGuztira.toFixed(2)}€</span>
                    </div>
                </main>

                <footer className="footer">
                    © 2025 Pisukide. Eskubide guztiak erreserbatuta
                </footer>
            </div>
        </AppLayout>
    );
};

export default GastuakPage;