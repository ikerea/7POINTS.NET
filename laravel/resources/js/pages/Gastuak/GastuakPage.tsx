import { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import Gastos from './Gastos'; 
import './GastuakPage.css';

// --- INTERFACES (Tal cual definimos antes) ---

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
    auth: {       // Datos del usuario logueado (Inertia suele mandarlo)
        user: User
    };
}

const GastuakPage = ({ piso, auth }: Props) => {
    // Extraemos gastos e inquilinos del objeto piso (con valores por defecto por seguridad)
    const listaGastos = piso.gastos || [];
    const listaInquilinos = piso.inquilinos || [];
    const usuarioLogueado = auth?.user;

    const [activeTab, setActiveTab] = useState<'gastuak' | 'zergak'>('gastuak');

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

    return (
        <div className="page-wrapper">
            <header className="header">
                <div className="logo-box">Logoa</div>
                <nav className="nav-links">
                    <Link href="/dashboard">Sarrera</Link>
                    <Link href="/pisos">Pisuak ikusi</Link>
                    <Link href="/gastuak" className="btn-gastos">Gastuak</Link>
                </nav>
                <div className="user-profile">
                    <span style={{marginRight: '10px'}}>{usuarioLogueado?.name}</span>
                    <div className="avatar-circle">
                         {/* Inicial del usuario */}
                        {usuarioLogueado?.name.charAt(0).toUpperCase()}
                    </div>
                </div>
            </header>

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
                        <button className="date-filter-btn">Data filtro</button>
                        <div 
                            className="add-btn" 
                            onClick={() => router.visit('/gastuak/ikusi')}
                        >
                            +
                        </div>
                    </div>
                </div>

                <div className="contenido-centrado">
                    {/* Pasamos la lista extraída del piso */}
                    <Gastos 
                        gastos={listaGastos} 
                        onDelete={handleDeleteGasto}
                        onEdit={handleEditGasto}
                    />
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
    );
};

export default GastuakPage;