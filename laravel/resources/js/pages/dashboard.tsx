import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import DashBoardSvgIcon from '@/components/ui/dashboardSvgIcon';
import { Clock, User, ArrowRight, CircleDashed } from 'lucide-react'; // Añadí CircleDashed para variar iconos
import moment from 'moment';
import 'moment/dist/locale/eu';

moment.locale('eu');

interface UserData {
    id: number;
    name: string;
    pivot: { hasiera_data: string };
}

interface Zeregina {
    id: number;
    izena: string;
    deskripzioa: string;
    egoera: string;
    erabiltzaileak: UserData[];
}

// Ahora recibimos dos listas
interface DashboardProps {
    zereginakEgiteko: Zeregina[];
    zereginakEgiten: Zeregina[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

const customGreen = '#00796B';

// --- SUB-COMPONENTE: Tarjeta Tarea (Adaptable por color) ---
const DashboardTaskItem = ({ task, colorClass, iconColorClass }: { task: Zeregina, colorClass: string, iconColorClass: string }) => {
    const assignedUser = task.erabiltzaileak.length > 0 ? task.erabiltzaileak[0] : null;
    const dateString = assignedUser
        ? moment(assignedUser.pivot.hasiera_data).format('YYYY/M/D')
        : '';

    return (
        <div className="group relative block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-3">
            {/* Barra lateral de color variable */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-xl ${colorClass}`}></div>

            <div className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="grid grid-cols-12 gap-4 flex-1 items-center ml-2">
                    <div className="col-span-12 md:col-span-5 font-semibold text-gray-800 truncate flex items-center gap-2">
                        {task.izena}
                    </div>
                    <div className="col-span-12 md:col-span-4 flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-sm truncate">
                            {assignedUser ? assignedUser.name : 'Esleitu gabe'}
                        </span>
                    </div>
                    <div className="hidden md:flex col-span-2 items-center gap-2 text-sm text-gray-500">
                        <span>{dateString}</span>
                    </div>
                </div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-50`}>
                    <Clock className={`w-5 h-5 ${iconColorClass}`} />
                </div>
            </div>
        </div>
    );
};
const TaskListSection = ({ title, tasks, colorBorder, colorBg, colorIcon }: { title: string, tasks: Zeregina[], colorBorder: string, colorBg: string, colorIcon: string }) => {
    return (
        <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black uppercase tracking-wide border-l-4 pl-4" style={{ borderColor: colorBorder }}>
                    {title}
                </h2>
                {tasks.length > 0 && (
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-200 text-gray-600">
                        {tasks.length}
                    </span>
                )}
            </div>
            {tasks.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {tasks.map((task) => (
                        <DashboardTaskItem
                            key={task.id}
                            task={task}
                            colorClass={colorBg}
                            iconColorClass={colorIcon}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-sm font-medium text-gray-400 italic">
                        Ez dago zereginik atal honetan.
                    </p>
                </div>
            )}
        </div>
    );
};

export default function Dashboard({ zereginakEgiteko = [], zereginakEgiten = [] }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;

    // Verificamos si hay AL MENOS UNA tarea en total para mostrar el SVG gigante o no
    const hasAnyTask = zereginakEgiteko.length > 0 || zereginakEgiten.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f3f4f6' }}>
                <div className="flex-grow w-full max-w-7xl mx-auto p-6 md:p-8">
                    <div className="w-full rounded-xl p-8 mb-10 shadow-sm" style={{ backgroundColor: '#A8D5D5' }}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2 uppercase">
                                    KAIXO <span style={{color: '#A89996'}}>{auth.user.name}</span>
                                </h1>
                                <p className="text-gray-700 font-medium text-lg">
                                    Hemen duzu zure pisuko zereginen laburpena.
                                </p>
                            </div>
                            <Link href="/zereginak" style={{backgroundColor: '#00796B'}} className="hidden md:flex hover:brightness-95 text-white px-4 py-2 rounded-lg text-sm font-medium transition items-center gap-2 backdrop-blur-sm">
                                Ikusi Egutegia <ArrowRight size={16}/>
                            </Link>
                        </div>
                    </div>
                    {hasAnyTask ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* COLUMNA 1: EGITEKO (ROJO) */}
                            <TaskListSection
                                title="EGITEKO"
                                tasks={zereginakEgiteko}
                                colorBorder="#ef4444" // red-500
                                colorBg="bg-red-500"
                                colorIcon="text-red-500"
                            />

                            {/* COLUMNA 2: EGITEN (AZUL) */}
                            <TaskListSection
                                title="EGITEN"
                                tasks={zereginakEgiten}
                                colorBorder="#3b82f6" // blue-500
                                colorBg="bg-blue-500"
                                colorIcon="text-blue-500"
                            />
                        </div>
                    ) : (
                        // SVG GIGANTE SI NO HAY NADA DE NADA
                        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <div className="w-full max-w-sm mb-8 flex justify-center">
                                <div className="h-100 w-100 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-center text-xs p-4">
                                    <DashBoardSvgIcon className='w-full h-auto'/>
                                </div>
                            </div>
                            <p className="text-xl font-bold text-gray-800 uppercase tracking-wide text-center">
                                AUPA! EZ DAUDE ZEREGINAK ORAINGOZ
                            </p>
                            <Link href="/zereginak/sortu" className="mt-6 text-teal-700 font-bold hover:underline">
                                + Sortu lehen zeregina
                            </Link>
                        </div>
                    )}
                </div>
                <footer className="w-full py-6 text-center text-white text-sm font-medium mt-auto" style={{ backgroundColor: customGreen }}>
                    © 2026 Pisukide. Eskubide guztiak erreserbatuta
                </footer>
            </div>
        </AppLayout>
    );
}
