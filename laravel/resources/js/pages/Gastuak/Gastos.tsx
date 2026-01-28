import './gastosCSS.css'

export interface Gasto {
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
    onDelete: (id: number) => void;
    onEdit: (gasto: Gasto) => void;
    usuariosMap: Map<number, string>;
}

function Gastos(props: GastosProps) {
    const { gastos, onDelete, onEdit, usuariosMap } = props;

    return (
        <div className="divPadre">
            {gastos.map((gasto) => (
                <div className="divHijos" key={gasto.IdGasto}>
                    
                    {/* ZONA 1: Texto (Se encoge si hace falta) */}
                    <div className="divNombreYGastoNombre">
                        <h6 title={gasto.Nombre}>Izena: {gasto.Nombre}</h6>
                        <p>Ordainduta: {usuariosMap.get(gasto.IdUsuario) || 'Erabiltzaile ezezaguna'}</p>
                    </div>
                    
                    {/* ZONA 2: Precio y Botones (NO se mueven ni se encogen) */}
                    <div className="divDerecha">
                        <h3>{gasto.Cantidad} €</h3>

                        <div className="acciones-gastos">
                            <button 
                                className="btn-editar"
                                onClick={() => onEdit(gasto)}
                            >
                                Editatu
                            </button>
                            
                            <button 
                                className="btn-borrar"
                                onClick={() => onDelete(gasto.IdGasto)}
                            >
                                Ezabatu
                            </button>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Gastos;