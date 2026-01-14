import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import SvgIcon from '@/components/ui/svgIcons'; // Asegúrate de importar tu SvgIcon si ya lo tienes

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Color corporativo para el footer y detalles
const customGreen = '#00796B';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f3f4f6' }}>
                <div className="flex-grow w-full max-w-7xl mx-auto p-6 md:p-8">
                    <div
                        className="w-full rounded-xl p-8 mb-10 shadow-sm"
                        style={{ backgroundColor: '#A8D5D5' }}
                    >
                        <h1 className="text-3xl font-bold text-white mb-2 uppercase">
                            KAIXO <span style={{color: '#A89996'}}>{auth.user.name}</span>
                        </h1>
                        <p className="text-gray-700 font-medium text-lg">
                            Kudeatu zure pisuko zereginak modu errazean, eta mantendu dena zure lankideekin antolatuta.
                        </p>
                    </div>
                    <h2
                        className="text-2xl font-bold text-black uppercase mb-10 tracking-wide border-l-4 pl-4"
                        style={{ borderColor: customGreen }}
                    >
                        ZEREGINAK
                    </h2>
                    <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="w-full max-w-sm mb-8 flex justify-center">
                            <div className="h-48 w-48 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-center text-xs p-4">
                                [Zure SVG Hemen]
                            </div>
                        </div>
                        <p className="text-xl font-bold text-gray-800 uppercase tracking-wide text-center">
                            AUPA! EZ DAUDE ZEREGINAK EGITEKO
                        </p>
                    </div>

                </div>
                <footer className="w-full py-6 text-center text-white text-sm font-medium mt-auto" style={{ backgroundColor: customGreen }}>
                    © 2025 Pisukide. Eskubide guztiak erreserbatuta
                </footer>
            </div>
        </AppLayout>
    );
}
