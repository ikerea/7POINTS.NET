import { Breadcrumbs } from '@/components/breadcrumbs';
// Eliminamos la dependencia de Icon para evitar conflictos de tipos y usamos los iconos directamente
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn, isSameUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, LayoutGrid, Home, ListTodo, Wallet, SearchCheck } from 'lucide-react';
import { useState } from 'react';
import AppLogo from './app-logo';

// El color verde de tu diseño
const customGreen = '#00796B';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

// Usamos 'export default' para arreglar el error del build
export default function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    // 1. OBTENER DATOS (INCLUIDO EL NOMBRE DEL PISO)
    const page = usePage<SharedData & { pisua_izena?: string }>();
    const { auth, pisua_izena } = page.props;

    // El hook devuelve una función para calcular iniciales
    const getInitials = useInitials();

    // 2. DEFINIR MENÚ DENTRO PARA PODER USAR 'pisua_izena'
    const mainNavItems: NavItem[] = [
        {
            title: 'Sarrera', // Dashboard
            href: dashboard(),
            icon: LayoutGrid,
        },
        {

            title:  'Pisuak ikusi',
            href: '/pisua/erakutsi',
            icon: Home,
        },
        {
            title: 'Zereginak',
            href: '/zereginak',
            icon: ListTodo,
        },
        {
            title: 'Gastuak',
            href: '/gastuak',
            icon: Wallet,
        },
        {
            title: pisua_izena ||'Pisua',
            href: '/pisua/kideak',
            icon: SearchCheck,
        },
    ];

    return (
        <>
            <div className="w-full shadow-md transition-colors duration-200" style={{ backgroundColor: customGreen }}>
                <div className="mx-auto flex h-20 items-center justify-between px-4 md:max-w-7xl text-white">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 text-white hover:bg-white/20 hover:text-white"
                                    >
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-64 bg-white p-0">
                                    <SheetHeader className="p-4 border-b">
                                        <SheetTitle className="text-left font-bold text-xl text-[#00796B]">
                                            <AppLogo />
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col p-4 space-y-3">
                                        {mainNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center space-x-3 text-gray-700 font-medium py-2 px-2 hover:bg-gray-100 rounded-md",
                                                     isSameUrl(item.href, page.url) && "bg-gray-100 text-[#00796B]"
                                                )}
                                            >
                                                {item.icon && <item.icon className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Logo Desktop */}
                        <Link href={dashboard()} className="flex items-center gap-2">
                             {/* Usamos AppLogo o texto según prefieras, aquí dejo el texto como en tu diseño verde */}
                            <span className="text-xl font-bold tracking-wide text-white">
                                PISUKIDE
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {mainNavItems.map((item) => {
                            const isActive = isSameUrl(page.url, item.href);
                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={cn(
                                        "px-3 py-1 text-sm font-medium transition-colors duration-200 rounded-md",
                                        isActive
                                            ? "bg-white text-[#00796B] border border-white" // Estilo Activo (Tu diseño)
                                            : "text-white hover:bg-white/10 hover:text-gray-100" // Estilo Normal
                                    )}
                                >
                                    <div className='flex items-center space-x-2'>
                                        <span>{item.title}</span>
                                        {/* Icono directo sin componente intermedio */}
                                        {item.icon && (
                                            <item.icon className="h-4 w-4" />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-3">
                        <span className="hidden sm:block text-sm font-medium text-white opacity-90">
                            {auth.user.name}
                        </span>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-full p-0 border-2 border-transparent hover:border-white/50 focus:border-white transition-all"
                                >
                                    <Avatar className="size-9 bg-white text-[#00796B]">
                                        <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                        <AvatarFallback className="bg-white text-[#00796B] font-bold">
                                            {/* Llamamos a la función getInitials con el nombre */}
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-gray-200 bg-white">
                    <div className="mx-auto flex h-10 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
