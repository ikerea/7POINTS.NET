import React from 'react';
import { Link, Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';


import {
    Calendar as CalendarIcon,
    ArrowRight,
    User,
    Edit,
    Trash2,
    Clock,
    CheckCircle2,
    XCircle
} from 'lucide-react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

moment.locale('es');
const localizer = momentLocalizer(moment);


interface Pisua {
    id: number;
    izena: string;
}

interface Pivot {
    hasiera_data: string;
}

interface Erabiltzailea {
    id: number;
    name: string;
    pivot: Pivot;
}

interface Zeregina {
    id: number;
    izena: string;
    deskripzioa: string;
    pisua_id: number;
    pisua: Pisua | null;
    erabiltzaileak: Erabiltzailea[];
    egoera: 'egiteko' | 'egiten' | 'eginda';
}

interface Props {
    zereginak: Zeregina[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Zereginak', href: '/zereginak' },
];

// --- CONFIGURACIÓN DE ESTADOS (CAMBIOS AQUÍ) ---
const statusStyles = {
    egiteko: {
        // Usamos Rojo/Rosa para la X
        color: 'bg-red-500',
        text: 'text-red-600',
        bg: 'bg-red-50',
        icon: XCircle, // <--- CAMBIO: Icono X
        label: 'Egiteko'
    },
    egiten: {
        // Usamos Azul para el proceso (Reloj)
        color: 'bg-blue-500',
        text: 'text-blue-600',
        bg: 'bg-blue-50',
        icon: Clock, // <--- CAMBIO: Icono Reloj
        label: 'Egiten'
    },
    eginda: {
        // Verde para completado
        color: 'bg-green-500',
        text: 'text-green-600',
        bg: 'bg-green-50',
        icon: CheckCircle2,
        label: 'Eginda'
    }
};

export default function Index({ zereginak }: Props) {

    const eventosCalendario = zereginak.flatMap((tarea) => {
        return tarea.erabiltzaileak.map((user) => ({
            id: tarea.id,
            title: `${tarea.izena} (${tarea.pisua?.izena || '-'})`,
            start: new Date(user.pivot.hasiera_data),
            end: new Date(user.pivot.hasiera_data),
            allDay: true,
            egoera: tarea.egoera,
        }));
    });

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres borrar esta tarea?')) {
            router.delete(`/zereginak/${id}`);
        }
    };

    // Función para pintar los eventos del calendario
    const eventStyleGetter = (event: any) => {
        let backgroundColor = '#3b82f6'; // Azul por defecto

        switch (event.egoera) {
            case 'egiteko':
                backgroundColor = '#ef4444'; // Rojo (bg-red-500)
                break;
            case 'egiten':
                backgroundColor = '#3b82f6'; // Azul (bg-blue-500)
                break;
            case 'eginda':
                backgroundColor = '#22c55e'; // Verde (bg-green-500)
                break;
        }

        return {
            style: {
                backgroundColor: backgroundColor,
                borderRadius: '6px',
                opacity: 0.9,
                color: 'white',
                border: '0px',
                display: 'block'
            }
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Tareas" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="max-w-7xl mx-auto space-y-6 w-full">

                    {/* SECCIÓN CALENDARIO */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border">
                        <h2 className="text-xl font-bold mb-4 text-gray-700 flex items-center gap-2">
                            <CalendarIcon className="w-6 h-6" /> Calendario
                        </h2>
                        <div style={{ height: 500 }}>
                           <Calendar
                                localizer={localizer}
                                events={eventosCalendario}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: '100%' }}
                                eventPropGetter={eventStyleGetter}
                                messages={{ next: "Sig", previous: "Ant", today: "Hoy", month: "Mes", week: "Semana", day: "Día" }}
                                onSelectEvent={(event: any) => router.get(`/zereginak/${event.id}/editatu`)}
                            />
                        </div>
                    </div>

                    {/* SECCIÓN LISTADO */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold text-gray-700">Listado de Tareas</h2>
                            <Link
                                href="/zereginak/sortu"
                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full shadow transition flex items-center gap-2"
                            >
                                <span>+</span> Nueva Tarea
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                            {zereginak.length === 0 && (
                                <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed">
                                    No hay tareas creadas todavía.
                                </div>
                            )}

                            {zereginak.map((task) => {
                                const assignedUser = task.erabiltzaileak.length > 0 ? task.erabiltzaileak[0] : null;
                                const dateString = assignedUser
                                    ? new Date(assignedUser.pivot.hasiera_data).toLocaleDateString()
                                    : 'Sin fecha';

                                const currentStatus = statusStyles[task.egoera] || statusStyles['egiteko'];
                                const StatusIcon = currentStatus.icon;

                                return (
                                    <div
                                        key={task.id}
                                        className="group relative bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 px-6 py-3 flex items-center justify-between gap-4 overflow-hidden"
                                    >
                                        {/* BARRA LATERAL DE COLOR */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-2 ${currentStatus.color}`}></div>

                                        {/* GRID PRINCIPAL */}
                                        <div className="grid grid-cols-12 gap-4 flex-1 items-center ml-2">

                                            {/* 1. NOMBRE */}
                                            <div className="col-span-12 md:col-span-5 font-semibold text-gray-800 truncate pr-4" title={task.izena}>
                                                {task.izena}
                                            </div>

                                            {/* 2. USUARIO */}
                                            <div className="col-span-12 md:col-span-4 flex items-center gap-2 text-gray-600">
                                                <ArrowRight className="w-4 h-4 text-gray-400 hidden md:block" />
                                                <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                <span className="font-medium text-sm truncate">
                                                    {assignedUser ? assignedUser.name : <span className="text-gray-400 italic">Sin asignar</span>}
                                                </span>
                                            </div>

                                            {/* 3. FECHA */}
                                            <div className="hidden md:flex col-span-2 items-center gap-2 text-sm text-gray-500">
                                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                                <span>{dateString}</span>
                                            </div>

                                            {/* 4. PISO */}
                                            <div className="hidden lg:flex col-span-1 justify-end">
                                                 <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                                                    {task.pisua ? task.pisua.izena : '-'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* BLOQUE DERECHO */}
                                        <div className="flex items-center gap-4 flex-shrink-0 pl-2 border-l border-gray-100">

                                            {/* ICONO DE ESTADO */}
                                            <div className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full ${currentStatus.bg}`} title={currentStatus.label}>
                                                {/* He quitado la animación de spin porque al reloj no le suele pegar girar entero */}
                                                <StatusIcon className={`w-5 h-5 ${currentStatus.text}`} />
                                            </div>

                                            {/* BOTONES */}
                                            <div className="flex items-center gap-1">
                                                <Link
                                                    href={`/zereginak/${task.id}/editatu`}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(task.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                                                    title="Borrar"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
