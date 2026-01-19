import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react'; 
import './GastuakPage.css'; 
import './AddGastoForm.css'; 

// Definimos la interfaz aproximada de lo que te llega desde Laravel
interface GastoData {
    id: number; // O IdGasto, asegúrate de usar el nombre correcto de tu BD
    izenburua: string;
    dirua: number;
    data: string;
    ordainduta: string;
}

// Recibimos el objeto 'gasto' como prop (Inertia te lo pasa desde el Controller)
const EditGastoForm = ({ gasto }: { gasto: GastoData }) => {
    
    // 1. ESTADO INICIAL: Usamos los datos del gasto que recibimos
    const [values, setValues] = useState({
        izenburua: gasto.izenburua || '',
        dirua: gasto.dirua || '',
        data: gasto.data || '',
        ordainduta: gasto.ordainduta || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    // 2. ENVÍO DEL FORMULARIO (PUT)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Usamos router.put y apuntamos a la URL con el ID
        // Asegúrate de que gasto.id coincida con tu base de datos (puede ser gasto.IdGasto)
        router.put(`/gastuak/${gasto.id}`, values);
    };

    return (
        <div className="page-wrapper">
            
            <header className="header">
                <div className="logo-box">Logoa</div>
                <nav className="nav-links">
                    <Link href="/sarrera">Sarrera</Link>
                    <Link href="/pisuak">Pisuak ikusi</Link>
                    <Link href="/zereginak">Zereginak</Link>
                    <Link href="/gastuak" className="btn-gastos">Gastuak</Link>
                    <Link href="/pisua">Pisua</Link>
                </nav>
                <div className="user-profile">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
            </header>

            <main className="main-container">
                
                <h1 style={{textAlign: 'center', marginTop: '20px', marginBottom: '40px'}}>
                    {/* Cambiamos el título para que tenga sentido */}
                    <span className="page-title-underline">Editatu Gastua</span>
                </h1>

                <form className="form-container" onSubmit={handleSubmit}>
                    
                    {/* Campo: Izenburua */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="izenburua">Izenburua:</label>
                        <input 
                            type="text" 
                            id="izenburua"
                            name="izenburua" 
                            value={values.izenburua}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Campo: Dirua */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="dirua">Dirua:</label>
                        <input 
                            type="number" 
                            id="dirua"
                            name="dirua" 
                            value={values.dirua}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="€"
                        />
                    </div>

                    {/* Campo: Data */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="data">Data:</label>
                        <input 
                            type="date" 
                            id="data"
                            name="data" 
                            value={values.data}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Campo: Ordainduta */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="ordainduta">Ordainduta:</label>
                        <input 
                            type="text" 
                            id="ordainduta"
                            name="ordainduta" 
                            value={values.ordainduta}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Botón de envío: Cambiamos el texto a "Gorde" */}
                    <button type="submit" className="submit-btn">Gorde</button>

                </form>
            </main>

            <footer className="footer">
                © 2025 Pisukide. Eskubide guztiak erreserbatuta
            </footer>
        </div>
    );
};

export default EditGastoForm;