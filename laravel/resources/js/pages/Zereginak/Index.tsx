import React from 'react';
import { Link, Head,router} from '@inertiajs/react';


// 1. Definimos las interfaces para que TypeScript no se queje
interface Pisua {
    id: number;
    izena: string;
}

interface Zeregina {
    id: number;
    izena: string;
    deskripzioa: string;
    pisua_id: number;
    pisua: Pisua | null; // Puede ser null si no tiene piso asignado
}

interface Props {
    zereginak: Zeregina[]; // Recibimos un array de tareas
}

// 2. El Componente Principal
export default function Index({ zereginak }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres borrar esta tarea?')) {
            router.delete(`/zereginak/${id}`);
        }
    };
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Head title="Lista de Tareas" />

            <div className="max-w-7xl mx-auto bg-white shadow-sm sm:rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Zereginak (Tareas)</h1>

                    {/* Botón para crear (apunta a la ruta de create) */}
                  <Link
                    href="/zereginak/sortu"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Nueva Tarea +
                </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                                    ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                                    Izena
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                                    Deskripzioa
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                                    Pisua
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {zereginak.map((task) => (
                                <tr key={task.id}>
                                    {/* ID */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {task.id}
                                    </td>

                                    {/* IZENA - Aquí ponemos text-gray-900 para que sea negro */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {task.izena}
                                    </td>

                                    {/* DESKRIPZIOA */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {task.deskripzioa || '-'}
                                    </td>

                                    {/* PISO */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {task.pisua ? task.pisua.izena : 'Sin asignar'}
                                    </td>

                                    {/* ACCIONES (Botón editar) */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            href={`/zereginak/${task.id}/editatu`}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Editar
                                        </Link>
                                       <button className="text-red-600" onClick={() => handleDelete(task.id)}>
                                        Borrar
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
