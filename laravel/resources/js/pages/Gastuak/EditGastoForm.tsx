import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import './GastuakPage.css';
import './AddGastoForm.css';

// 1. Definimos las interfaces
interface UsuarioData {
    id: number;
    name: string;
}

interface GastoData {
    IdGasto: number;
    Nombre: string;
    Cantidad: number;
    Fecha: string;
    IdUsuario: string | number; // Puede venir como string o number
}

// Definimos las Props que recibe el componente
interface Props {
    gasto: GastoData;
    usuarios: UsuarioData[]; // <--- Añadimos el array de usuarios
}

// 2. Desestructuramos 'gasto' y 'usuarios' de las props
const EditGastoForm = ({ gasto, usuarios }: Props) => {

    // ESTADO INICIAL
    const [values, setValues] = useState({
        Nombre: gasto.Nombre || '',
        Cantidad: gasto.Cantidad || '',
        Fecha: gasto.Fecha ? gasto.Fecha.substring(0, 10) : '',
        IdUsuario: gasto.IdUsuario || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/gastuak/editar/${gasto.IdGasto}`, values);
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
                    {/* Icono usuario */}
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </div>
            </header>

            <main className="main-container">
                <h1 style={{textAlign: 'center', marginTop: '20px', marginBottom: '40px'}}>
                    <span className="page-title-underline">Editatu Gastua</span>
                </h1>

                <form className="form-container" onSubmit={handleSubmit}>
                    
                    {/* Campo: Izenburua */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="izenburua">Izenburua:</label>
                        <input 
                            type="text" 
                            id="izenburua"
                            /* CORREGIDO: name debe coincidir con el estado (Nombre) */
                            name="Nombre"  
                            value={values.Nombre}
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
                            /* CORREGIDO: name debe coincidir con el estado (Cantidad) */
                            name="Cantidad" 
                            value={values.Cantidad}
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
                            /* CORREGIDO: name debe coincidir con el estado (Fecha) */
                            name="Fecha" 
                            value={values.Fecha}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    {/* Campo: Ordainduta (USUARIOS) */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="IdUsuario">Ordainduta:</label>
                        <select 
                            name="IdUsuario" 
                            id="IdUsuario"
                            className="form-input"
                            value={values.IdUsuario}
                            onChange={handleChange}
                        >
                            <option value="">--Aukeratu erabiltzailea--</option>
                            {/* Iteramos sobre la prop 'usuarios' */}
                            {usuarios && usuarios.map(usuario => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.name}
                                </option>
                            ))}
                        </select>
                    </div>

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