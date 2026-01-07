import React from 'react';

interface Pisua {
    id: number;
    name: string;
    code: string;
    // Odoo-k Many2one eremuak [id, "izena"] bezala itzultzen ditu, edo false hutsik badago
    //coordinator_id: [number, string] | false;
}

interface ErakutsiProps {
    pisuak: Pisua[];
}

export default function erakutsi({ pisuak }: ErakutsiProps) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Pisuen Zerrenda</h2>

            {pisuak.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Ez dago pisurik erakusteko.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Izena
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kodea
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Koordinatzailea
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pisuak.map((pisua) => (
                                <tr key={pisua.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {pisua.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs">
                                            {pisua.code}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {/* Odoo-ren Many2one formatua kudeatu: [id, izena] */}
                                        {Array.isArray(pisua.coordinator_id)
                                            ? pisua.coordinator_id[1]
                                            : <span className="text-gray-400 italic">Esleitu gabe</span>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
