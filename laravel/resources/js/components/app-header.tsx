import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
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
import AppLogo from './app-logo';

// 1. DEFINIMOS TUS ENLACES DE PISUKIDE
const mainNavItems: NavItem[] = [
    {
        title: 'Sarrera', // Dashboard
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Pisuak ikusi',
        href: '#', // Pon aquí la ruta real cuando la tengas
        icon: Home,
    },
    {
        title: 'Zereginak',
        href: '/zereginak',
        icon: ListTodo,
    },
    {
        title: 'Gastuak',
        href: '#',
        icon: Wallet,
    },
    {
        title: 'Pisua',
        href: '#',
        icon: SearchCheck,
    },
];

// El color verde de tu diseño
const customGreen = '#00796B';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    return (
        <>
            <div className="w-full shadow-md transition-colors duration-200" style={{ backgroundColor: customGreen }}>
                <div className="mx-auto flex h-20 items-center justify-between px-4 md:max-w-7xl text-white">
                    <div className="flex items-center gap-4">
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
                                            PISUKIDE
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col p-4 space-y-3">
                                        {mainNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="flex items-center space-x-3 text-gray-700 font-medium py-2 px-2 hover:bg-gray-100 rounded-md"
                                            >
                                                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Logo Desktop */}
                        <Link href={dashboard()} className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-wide text-white">
                                PISUKIDE
                            </span>
                        </Link>
                    </div>
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
                                        {item.icon && (
                                            <Icon iconNode={item.icon} />
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
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
