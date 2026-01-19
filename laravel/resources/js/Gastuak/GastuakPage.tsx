import { useState } from 'react';
import { router } from '@inertiajs/react'; // Importamos el router de Inertia
import Gastos, { type Gasto } from './Gastos'; 
import './GastuakPage.css';

// --- DATOS INICIALES ---
const mockUser = {
    id: 1, name: "Luken Franco", email: "luken@test.com", email_verified_at: null,
    mota: "Admin", odoo_id: null, synced: 1, sync_error: null,
    created_at: "2023-01-01", updated_at: "2023-01-01"
};

const initialGastos: Gasto[] = [
    { IdGasto: 1, IdUsuario: 1, IdPiso: 1, Cantidad: 330, usuario: mockUser },
    { IdGasto: 2, IdUsuario: 2, IdPiso: 1, Cantidad: 50, usuario: { ...mockUser, name: "Igor Viyuela" } },
    { IdGasto: 3, IdUsuario: 3, IdPiso: 1, Cantidad: 30, usuario: { ...mockUser, name: "Jon Doe" } },
];

const GastuakPage = () => {
    const [activeTab, setActiveTab] = useState<'gastuak' | 'zergak'>('gastuak');
    const [listaGastos, setListaGastos] = useState<Gasto[]>(initialGastos);

    const totalGuztira = listaGastos.reduce((acc, curr) => acc + curr.Cantidad, 0);
    const totalNire = listaGastos
        .filter(g => g.IdUsuario === 1) 
        .reduce((acc, curr) => acc + curr.Cantidad, 0);

    // --- FUNCIÓN PARA ELIMINAR (DELETE) ---
    const handleDeleteGasto = (id: number) => {
        if (!window.confirm("¿Seguro que quieres borrar este gasto?")) return;

        // Opción A: Si quieres que Inertia maneje el borrado real contra Laravel:
        router.delete(`/gastos/deleteGasto/${id}`, {
            onSuccess: () => {
                // Si la backend devuelve los datos nuevos, Inertia actualiza solo.
                // Si necesitas borrarlo visualmente manual:
                setListaGastos(prev => prev.filter(g => g.IdGasto !== id));
            }
        });
    };

    // --- FUNCIÓN PARA EDITAR (REDIRECT CON INERTIA) ---
    const handleEditGasto = (gasto: Gasto) => {
        // Esto hace una petición GET (navegación estándar) a tu ruta de edición en Laravel
        // Ejemplo de ruta: /gastos/{id}/edit
        router.get(`/gastos/${gasto.IdGasto}/edit`);
    };

    return (
        <div className="page-wrapper">
            <header className="header">
                <div className="logo-box">Logoa</div>
                <nav className="nav-links">
                    <a href="#">Sarrera</a>
                    <a href="#">Pisuak ikusi</a>
                    <a href="#">Zereginak</a>
                    <a href="#" className="btn-gastos">Gastuak</a>
                    <a href="#">Pisua</a>
                </nav>
                <div className="user-profile">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
            </header>

            <main className="main-container">
                <h1 className="page-title">Gastuak</h1>

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
                        <div className="add-btn" title="Añadir gasto">+</div>
                    </div>
                </div>

                <div className="contenido-centrado">
                    <Gastos 
                        gastos={listaGastos} 
                        onDelete={handleDeleteGasto}
                        onEdit={handleEditGasto}
                    />
                </div>

                <div className="totals-section">
                    <span>Nire gastuak: {totalNire}€</span>
                    <span>Guztira: {totalGuztira}€</span>
                </div>
            </main>

            <footer className="footer">
                © 2025 Pisukide. Eskubide guztiak erreserbatuta
            </footer>
        </div>
    );
};

export default GastuakPage;