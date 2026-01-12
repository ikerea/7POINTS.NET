
interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    mota: string;
    odoo_id: number | null;
    synced: number;
    sync_error: string | null;
    created_at: string;
    updated_at: string;
}

interface gastos {
    idGasto: number,
    idUsuario: number,
    idPiso: number,
    cantidad: number,
    usuario: User
}

interface gastosProps {
    gastos: gastos[]
}



function gastos(props: gastosProps) {
    const { gastos } = props

    return (
        <>
            <div className="divPadre">
                {gastos.map((gasto, indice)=>(
                    <div className="divHijos">
                        <div className="divNombreYGastoNombre">
                            <h6>{ gasto.idGasto }</h6>
                            <p>Ordainduta: { gasto.usuario.name }</p>
                        </div>
                        <h3> { gasto.cantidad } </h3>

                    </div>
                ))}
            </div>
        </>
    )
}

export default gastos