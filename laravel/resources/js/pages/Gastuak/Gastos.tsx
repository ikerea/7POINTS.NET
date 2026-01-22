import './gastosCSS.css'

export interface Gasto { // Exporto la interfaz para usarla en el padre si hace falta
    IdGasto: number,
    Nombre: string,
    IdUsuario: number,
    IdPiso: number,
    Cantidad: number,
    created_at: string,
    updated_at: string
}

interface GastosProps {
    gastos: Gasto[];
    onDelete: (id: number) => void; // Función para eliminar
    onEdit: (gasto: Gasto) => void; // Función para editar
}

function Gastos(props: GastosProps) {
    const { gastos, onDelete, onEdit } = props;

    return (
        <div className="divPadre">
            {gastos.map((gasto) => (
                <div className="divHijos" key={gasto.IdGasto}>
                    
                    {/* Información del Gasto */}
                    <div className="divNombreYGastoNombre">
                        <h6>Nombre: {gasto.Nombre}</h6>
                        <p>Ordainduta: {gasto.IdUsuario}</p>
                    </div>
                    
                    <h3>{gasto.Cantidad} €</h3>

                    {/* --- NUEVOS BOTONES DE ACCIÓN --- */}
                    <div className="acciones-gastos" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button 
                            onClick={() => onEdit(gasto)}
                            style={{ backgroundColor: '#f0ad4e', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', color: 'white' }}
                        >
                            Editar
                        </button>
                        
                        <button 
                            onClick={() => onDelete(gasto.IdGasto)}
                            style={{ backgroundColor: '#d9534f', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', color: 'white' }}
                        >
                            Ezabatu
                        </button>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Gastos;