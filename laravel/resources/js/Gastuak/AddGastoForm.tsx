import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react'; // Importamos herramientas de Inertia
import './GastuakPage.css'; // Reutilizamos los estilos generales de la web
import './AddGastoForm.css'; // Importamos los estilos específicos de este formulario

const AddGastoForm = () => {
    // Estado inicial para los campos del formulario
    const [values, setValues] = useState({
        izenburua: '',
        dirua: '',
        data: '',
        ordainduta: '',
    });

    // Función para manejar los cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    };

    // Función para enviar el formulario usando Inertia
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí defines la ruta de Laravel que procesará el guardado (ej: POST /gastuak)
        router.post('/gastuak/addGastua', values);
    };

    return (
        // Usamos "page-wrapper" para mantener el fondo gris general
        <div className="page-wrapper">
            
            {/* --- HEADER (Idéntico al de la página principal) --- */}
            <header className="header">
                <div className="logo-box">Logoa</div>
                <nav className="nav-links">
                    <Link href="/sarrera">Sarrera</Link>
                    <Link href="/pisuak">Pisuak ikusi</Link>
                    <Link href="/zereginak">Zereginak</Link>
                    {/* El botón activo se marca diferente */}
                    <Link href="/gastuak" className="btn-gastos">Gastuak</Link>
                    <Link href="/pisua">Pisua</Link>
                </nav>
                <div className="user-profile">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
            </header>

            {/* --- CONTENIDO PRINCIPAL (Fondo blanco centrado) --- */}
            <main className="main-container">
                
                {/* Título con el subrayado estilo "tierra" */}
                <h1 style={{textAlign: 'center', marginTop: '20px', marginBottom: '40px'}}>
                    <span className="page-title-underline">Gastuak sortu/editatu</span>
                </h1>

                {/* --- FORMULARIO --- */}
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

                    {/* Campo: Dirua (Tipo number) */}
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

                    {/* Campo: Data (Tipo date) */}
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

                    {/* Botón de envío */}
                    <button type="submit" className="submit-btn">Sortu</button>

                </form>
            </main>

            {/* --- FOOTER (Idéntico) --- */}
            <footer className="footer">
                © 2025 Pisukide. Eskubide guztiak erreserbatuta
            </footer>
        </div>
    );
};

export default AddGastoForm;