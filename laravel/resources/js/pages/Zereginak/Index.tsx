import React, { useState, useRef, useEffect } from 'react';
import { Link, Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';


// Ikonoak inportatu 'lucide react' liurutegitik
import {
    Calendar as CalendarIcon,
    ArrowRight,
    User,
    Edit,
    Trash2,
    Clock,
    CheckCircle2,
    XCircle,
    MoreVertical,
    ChevronDown,
    ChevronUp,
    Filter
} from 'lucide-react';

// Egutegiaren liburutegiak eta moment.js datak kudeatzeko
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/dist/locale/eu';


// Moment.js konfiguratu euskaraz erabiltzeko
moment.locale('eu');
const localizer = momentLocalizer(moment);

// --- INTERFAZEAK ---
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

// --- EGOERAREN ESTILOAK ---
const statusStyles = {
    egiteko: {
        color: 'bg-red-500',
        text: 'text-red-600',
        bg: 'bg-red-50',
        icon: XCircle,
        label: 'Egiteko'
    },
    egiten: {
        color: 'bg-blue-500',
        text: 'text-blue-600',
        bg: 'bg-blue-50',
        icon: Clock,
        label: 'Egiten'
    },
    eginda: {
        color: 'bg-green-500',
        text: 'text-green-600',
        bg: 'bg-green-50',
        icon: CheckCircle2,
        label: 'Eginda'
    }
};

// --- 3 PUNTUKO MENUAREN KONPONENTEA: Menua ireki eta ixteko logika eta kanpoan klik egitean ixteko funtzionalitatea ---
interface OpcionesMenuProps {
    id: number;
    onDelete: (id: number) => void;
}

const OpcionesMenu = ({ id, onDelete }: OpcionesMenuProps) => {

    // Menua irekita dagoen ala ez
    const [isOpen, setIsOpen] = useState(false);

    // Menuaren elementua erreferentziatzeko
    const menuRef = useRef<HTMLDivElement>(null);

    // "Click outside" detektatzeko efektua: erabiltzaileak menutik kanpo klik egiten badu, itxi egingo da
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* 3 puntuko botoia */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition focus:outline-none"
            >
                <MoreVertical className="w-5 h-5" />
            </button>

            {/* Menua irekita badago, aukerak erakutsi */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">

                    {/* Editatzeko esteka */}
                    <Link
                        href={`/zereginak/${id}/editatu`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                    >
                        <Edit className="w-4 h-4" />
                        Editatu
                    </Link>

                    {/* Ezabatzeko botoia */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                            onDelete(id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                        <Trash2 className="w-4 h-4" />
                        Ezabatu
                    </button>
                </div>
            )}
        </div>
    );
};

// --- Zerrendaren elementuak, eta deskripzioa ireki edo itsi kudeaketa ---
const TaskItem = ({ task, onDelete }: { task: Zeregina, onDelete: (id: number) => void }) => {

    // Deskripzioa ikusi ala ez
    const [isExpanded, setIsExpanded] = useState(false);

    // Erabiltzailea eta data
    const assignedUser = task.erabiltzaileak.length > 0 ? task.erabiltzaileak[0] : null;
    const dateString = assignedUser
        ? moment(assignedUser.pivot.hasiera_data).format('YYYY/M/D')
        : 'Data gabe';

    // Estiloak kargatu egoeraren arabera
    const currentStatus = statusStyles[task.egoera] || statusStyles['egiteko'];
    const StatusIcon = currentStatus.icon;

    return (
        <div
            className="group relative block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* CARD-EKO KOLORE BARRA */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-xl ${currentStatus.color}`}></div>

            <div className="flex flex-col">

                <div className="relative px-6 py-4 flex items-center justify-between gap-4">

                    {/* ZEREGINAREN INFORMAZIOA */}
                    <div className="grid grid-cols-12 gap-4 flex-1 items-center ml-2">

                        {/* IZENA ZATIA */}
                        <div className="col-span-12 md:col-span-5 font-semibold text-gray-800 truncate pr-4 flex items-center gap-2">
                            {task.izena}
                        </div>

                        {/* ERABILTZAILE ZATIA*/}
                        <div className="col-span-12 md:col-span-4 flex items-center gap-2 text-gray-600">
                            <ArrowRight className="w-4 h-4 text-gray-400 hidden md:block" />
                            <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="font-medium text-sm truncate">
                                {assignedUser ? assignedUser.name : <span className="text-gray-400 italic">Esleitu gabe</span>}
                            </span>
                        </div>

                        {/* DATA ZATIA */}
                        <div className="hidden md:flex col-span-2 items-center gap-2 text-sm text-gray-500">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                            <span>{dateString}</span>
                        </div>

                    </div>

                    {/* Eskubiko zatia, Egoera ikonoa + Menua(edit eta delete) + Deskr ikonoa */}
                    <div className="flex items-center gap-3 flex-shrink-0 pl-2 border-l border-gray-100">

                        {/* Egoeraren ikonoa */}
                        <div className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full ${currentStatus.bg}`} title={currentStatus.label}>
                            <StatusIcon className={`w-5 h-5 ${currentStatus.text}`} />
                        </div>

                        {/* 3 puntuko menua (Editatu/Ezabatu) */}
                        <OpcionesMenu id={task.id} onDelete={onDelete} />

                        {/* Deskripzioaren menuaren ikonoa, gezia */}
                        <div className="text-gray-400">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                    </div>
                </div>

                {/* --- Deskripzioaren zatia (Menu desplegablea: Soilik 'isExpanded' egia denean erakusten da) --- */}
                {isExpanded && (
                    <div className="bg-gray-50 px-8 py-4 ml-2 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Deskripzioa</h4>
                        <p className="text-gray-700 text-sm whitespace-pre-wrap">
                            {task.deskripzioa || <span className="italic text-gray-400">Ez dago deskripziorik.</span>}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- OSAGAI NAGUSIA (INDEX) ---
export default function Index({ zereginak }: Props) {

   // 1. ESTADOS: Filtros
    const [filtroEgoera, setFiltroaEgoera] = useState<'denak' | 'egiteko' | 'egiten' | 'eginda'>('denak');
    // NUEVO: Estado para el filtro de usuario
    const [filtroErabiltzailea, setFiltroaErabiltzailea] = useState<string>('denak');

    // 2. OBTENER USUARIOS ÚNICOS (Para el Select)
    // Recorremos todas las tareas, sacamos los usuarios y quitamos duplicados usando un Map
    const erabiltzaileUnikoak = React.useMemo(() => {
        const users = zereginak.flatMap(z => z.erabiltzaileak);
        // Map usa el ID como clave para evitar duplicados
        return Array.from(new Map(users.map(u => [u.id, u])).values());
    }, [zereginak]);

    // 3. LOGIKA: Zereginak filtratu (Egoera + Erabiltzailea)
    const zereginFiltratuak = zereginak.filter((task) => {
        // Filtro por Estado
        const egoeraMatch = filtroEgoera === 'denak' || task.egoera === filtroEgoera;

        // NUEVO: Filtro por Usuario (comprobamos si el usuario seleccionado está en el array de la tarea)
        const userMatch = filtroErabiltzailea === 'denak' ||
                          task.erabiltzaileak.some(u => u.id.toString() === filtroErabiltzailea);

        return egoeraMatch && userMatch;
    });

    // Zereginak egutegiko formatura bihurtu
    const eventosCalendario = zereginFiltratuak.flatMap((tarea) => {
        return tarea.erabiltzaileak.map((user) => ({
            id: tarea.id,
            title: `${tarea.izena}`,
            start: new Date(user.pivot.hasiera_data),
            end: new Date(user.pivot.hasiera_data),
            allDay: true,
            egoera: tarea.egoera,
        }));
    });

    // Zeregina ezabatzeko funtzioa (alert batekin)
    const handleDelete = (id: number) => {
        if (confirm('Ziur zaude zeregin hori ezabatu nahi duzu?')) {
            router.delete(`/zereginak/${id}`);
        }
    };

    // Egutegiko ekitaldien koloreak definitzeko funtzioa
    const eventStyleGetter = (event: any) => {
        let backgroundColor = '#3b82f6';
        switch (event.egoera) {
            case 'egiteko': backgroundColor = '#ef4444'; break;
            case 'egiten': backgroundColor = '#3b82f6'; break;
            case 'eginda': backgroundColor = '#22c55e'; break;
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

    // Lehen letra larria jartzeko laguntzailea (Egutegiko tituluetarako)
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <AppLayout>
            <Head title="Zeregin Lista" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="max-w-7xl mx-auto space-y-6 w-full">

                    {/* EGUTEGIA */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border">
                        <h2 className="text-xl font-bold mb-4 text-gray-700 flex items-center gap-2">
                            <CalendarIcon className="w-6 h-6" /> Egutegia
                        </h2>
                        <div style={{ height: 500 }}>
                           <Calendar
                                localizer={localizer}
                                culture="eu"
                                events={eventosCalendario}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: '100%' }}
                                eventPropGetter={eventStyleGetter}
                                // Egutegiko formatuak euskarara egokitu (Larriak)
                                formats={{
                                    monthHeaderFormat: (date: Date, culture: any, localizer: any) =>
                                        capitalize(localizer.format(date, 'MMMM YYYY', culture)),
                                    weekdayFormat: (date: Date, culture: any, localizer: any) =>
                                        capitalize(localizer.format(date, 'dddd', culture)),
                                    dayHeaderFormat: (date: Date, culture: any, localizer: any) =>
                                        capitalize(localizer.format(date, 'dddd DD', culture)),
                                }}
                                // Itzulpenak (Moment-ek egiten ez dituenak)
                               messages={{
                                    next: "Hurrengoa",
                                    previous: "Aurrekoa",
                                    today: "Gaur",
                                    month: "Hilabetea",
                                    week: "Astea",
                                    day: "Eguna",
                                    agenda: "Agenda",
                                    date: "Data",
                                    time: "Ordua",
                                    event: "Ekitaldia",
                                    noEventsInRange: "Ez dago ekitaldirik tarte honetan."
                                }}
                                onSelectEvent={(event: any) => router.get(`/zereginak/${event.id}/editatu`)}
                            />
                        </div>
                    </div>

                    {/* --- ZEREGINEN ZERRENDA ATALA --- */}
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-2 gap-4">

                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-gray-700">Zeregin Lista</h2>

                            {/* FILTRO EGOERA */}
                            <div className="flex bg-white rounded-lg p-1 border shadow-sm">
                                {[
                                    { key: 'denak', label: 'Denak' },
                                    { key: 'egiteko', label: 'Egiteko' },
                                    { key: 'egiten', label: 'Egiten' },
                                    { key: 'eginda', label: 'Eginda' }
                                ].map((opt) => (
                                    <button
                                        key={opt.key}
                                        onClick={() => setFiltroaEgoera(opt.key as any)}
                                        className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                                            filtroEgoera === opt.key
                                            ? 'bg-gray-800 text-white shadow'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            {/* 2. NUEVO: SELECT DE USUARIOS */}
                            <div className="relative">
                                <select
                                    value={filtroErabiltzailea}
                                    onChange={(e) => setFiltroaErabiltzailea(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                                    style={{ minWidth: '150px' }}
                                >
                                    <option value="denak">Erabiltzaile guztiak</option>
                                    {erabiltzaileUnikoak.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Link
                            href="/zereginak/sortu"
                            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full shadow transition flex items-center gap-2"
                        >
                            <span>+</span> Zeregin Berria
                        </Link>
                    </div>

                        <div className="flex flex-col gap-3">
                            {/* Zerrenda hutsik badago mezua erakutsi */}
                            {zereginFiltratuak.length === 0 && (
                                <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed">
                                    Ez daude zereginik.
                                </div>
                            )}

                            {/* Zereginak mapeatu eta TaskItem bidez erakutsi */}
                            {zereginFiltratuak.map((task) => (
                                <TaskItem key={task.id} task={task} onDelete={handleDelete} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
