import React, { useEffect, useState } from 'react';
import { Link, router } from '@inertiajs/react'; // Importamos herramientas de Inertia
import './GastuakPage.css'; // Reutilizamos los estilos generales de la web
import './AddGastoForm.css'; // Importamos los estilos específicos de este formulario
import AppLayout from '@/layouts/app-layout';

interface UserProps {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    password?: string; // Opcional ya que normalmente no queremos exponerlo
    remember_token: string | null;
    created_at: string;
    updated_at: string;
    two_factor_secret: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_confirmed_at: string | null;
    mota: string; // "koordinatzailea", "administratzailea", etc.
    odoo_id: number | null;
    synced: number; // 0 o 1 (booleano como número)
    sync_error: string | null;
}

interface Usuarios {
    usuarios: UserProps[]
}

const AddGastoForm = (props: Usuarios) => {
    const { usuarios } = props
    // Estado inicial para los campos del formulario
    const [values, setValues] = useState({
        Nombre: '',
        Cantidad: '',
        Fecha: '',
        IdUsuario: '',
    });

    // Función para manejar los cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <AppLayout>
        {/* // Usamos "page-wrapper" para mantener el fondo gris general*/}
        <div className="page-wrapper">

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
                            id="Nombre"
                            name="Nombre" 
                            value={values.Nombre}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Campo: Dirua (Tipo number) */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="dirua">Dirua:</label>
                        <input 
                            type="number" 
                            id="Cantidad"
                            name="Cantidad" 
                            value={values.Cantidad}
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
                            id="Fecha"
                            name="Fecha" 
                            value={values.Fecha}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Campo: Ordainduta */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="ordainduta">Ordainduta:</label>
                        <select 
                            name="IdUsuario" 
                            id="IdUsuario"
                            className="form-input"  /* <--- ESTA ES LA CLAVE DEL DISEÑO */
                            value={values.IdUsuario} /* <--- Faltaba para controlar el estado */
                            onChange={handleChange}   /* <--- Faltaba para guardar el dato */
                        >
                            <option value="">--Aukeratu erabiltzailea--</option>
                            {usuarios.map(usuario => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.name}
                                </option>
                            ))}
                        </select>
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
        </AppLayout>

    );
};

export default AddGastoForm;