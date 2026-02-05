import { Link } from '@inertiajs/react';

export interface Gasto {
    IdGasto: number,
    Nombre: string,
    IdUsuario: number,
    IdPiso: number,
    Cantidad: number,
    Fecha: string,
    created_at: string,
    updated_at: string
}

interface GastosProps {
    gastos: Gasto[];
    onDelete: (id: number) => void;
    usuariosMap: Map<number, string>;
}

function Gastos(props: GastosProps) {
    const { gastos, onDelete, usuariosMap } = props;

    // Función auxiliar para formatear la fecha en formato Euskera (YYYY/MM/DD)
    const formatearFecha = (fechaString: string) => {
        if (!fechaString) return 'Data ezezaguna';
        const date = new Date(fechaString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    };

    return (
        <div className="max-w-3xl mx-auto p-5">
            {/* CONTENEDOR CON SCROLL:
                - max-h-[75vh]: Altura máxima del 75% de la pantalla.
                - overflow-y-auto: Scroll automático si excede la altura.
                - Clases [&::-webkit...]: Estilizan la barra de scroll para que sea fina y gris.
            */}
            <div className="flex flex-col gap-4 pr-2 overflow-y-auto max-h-[70vh]
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-gray-400"
            >
                {gastos.length === 0 ? (
                     <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                        Ez dago gasturik oraindik.
                     </div>
                ) : (
                    gastos.map((gasto) => (
                        <div
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:-translate-y-0.5 hover:shadow-md hover:border-gray-200 transition-all duration-200 mr-1"
                            key={gasto.IdGasto}
                        >
                            {/* ZONA 1: Texto (Izquierda) */}
                            <div className="flex flex-col gap-1 w-full sm:w-auto sm:flex-1 sm:mr-5 mb-3 sm:mb-0 min-w-0">
                                {/* Título */}
                                <h6
                                    className="text-lg font-semibold text-gray-800 truncate"
                                    title={gasto.Nombre}
                                >
                                    Izena: {gasto.Nombre}
                                </h6>

                                {/* Subtítulo: Quién pagó */}
                                <p className="text-sm text-gray-500">
                                    Ordainduta: <span className="font-medium text-gray-700">{usuariosMap.get(gasto.IdUsuario) || 'Erabiltzaile ezezaguna'}</span>
                                </p>

                                {/* Subtítulo: Fecha (Formato YYYY/MM/DD) */}
                                <p className="text-sm text-gray-400 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    {formatearFecha(gasto.Fecha)}
                                </p>
                            </div>

                            {/* ZONA 2: Derecha (Precio y Botones) */}
                            <div className="flex flex-row flex-wrap sm:flex-nowrap sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0 gap-2 sm:gap-2 flex-shrink-0">

                                {/* Precio */}
                                <h3 className="text-lg sm:text-xl font-bold text-emerald-500 whitespace-nowrap">
                                    {gasto.Cantidad} €
                                </h3>

                                {/* Botones de acción */}
                                <div className="flex gap-2">
                                    <Link
                                        href={`/gastuak/${gasto.IdGasto}/edit`}
                                        className="px-3 py-1.5 text-sm font-medium rounded-md bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors"
                                    >
                                        Editatu
                                    </Link>

                                    <button
                                        className="px-3 py-1.5 text-sm font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                        onClick={() => onDelete(gasto.IdGasto)}
                                    >
                                        Ezabatu
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Gastos;
