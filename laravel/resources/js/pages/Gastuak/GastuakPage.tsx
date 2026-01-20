    import { useEffect, useState } from 'react';
    import { router, Link } from '@inertiajs/react'; // Importamos Link para navegación fluida
    import Gastos, { type Gasto } from './Gastos'; 
    import './GastuakPage.css';

    // Definimos qué datos esperamos recibir desde el Controlador de Laravel
    interface Props {
        gastos: Gasto[];
    }

    const GastuakPage = ({ gastos = [] }: Props) => {
        // Ya no necesitamos un estado para la lista, usamos la prop 'gastos' directa
        const [activeTab, setActiveTab] = useState<'gastuak' | 'zergak'>('gastuak');


        // CÁLCULOS: Usamos Number() para asegurar que sumamos números y no cadenas de texto
        const totalGuztira = gastos.reduce((acc, curr) => acc + Number(curr.Cantidad), 0);
        
        // Filtramos por ID 1 (simulando que somos el usuario 1, ya que quitamos el Auth temporalmente)
        const totalNire = gastos
            .filter(g => g.IdUsuario === 1) 
            .reduce((acc, curr) => acc + Number(curr.Cantidad), 0);

        // --- FUNCIÓN PARA ELIMINAR (DELETE) ---
        const handleDeleteGasto = (id: number) => {
            if (!window.confirm("¿Seguro que quieres borrar este gasto?")) return;

            // Inertia envía la petición DELETE a Laravel
            router.delete(`/gastos/${id}`, {
                preserveScroll: true, // Mantiene la posición de la pantalla
                // No hace falta actualizar el estado manual, Inertia recarga la página con los datos nuevos automáticamente
            });
        };

        // --- FUNCIÓN PARA EDITAR ---
        const handleEditGasto = (gasto: Gasto) => {
            // Navega a la ruta de edición
            router.get(`/gastuak/${gasto.IdGasto}/edit`);
        };

        return (
            <div className="page-wrapper">
                <header className="header">
                    <div className="logo-box">Logoa</div>
                    <nav className="nav-links">
                        <a href="#">Sarrera</a>
                        <a href="#">Pisuak ikusi</a>
                        <a href="#">Zereginak</a>
                        {/* Usamos Link para que no recargue toda la página al clicar */}
                        <Link href="/gastuak" className="btn-gastos">Gastuak</Link>
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
                            
                            {/* BOTÓN AÑADIR: Ahora funciona con router.visit */}
                            <div 
                                className="add-btn" 
                                title="Añadir gasto"
                                onClick={() => router.visit('/gastuak/ikusi')}
                                style={{ cursor: 'pointer' }}
                            >
                                +
                            </div>
                        </div>
                    </div>

                    <div className="contenido-centrado">
                        {/* Pasamos los datos reales (gastos) al componente hijo */}
                        <Gastos 
                            gastos={gastos} 
                            onDelete={handleDeleteGasto}
                            onEdit={handleEditGasto}
                        />
                    </div>

                    <div className="totals-section">
                        {/* Usamos toFixed(2) para que siempre muestre 2 decimales (ej: 10.50€) */}
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