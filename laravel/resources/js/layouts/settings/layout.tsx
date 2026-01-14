import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn, isSameUrl, resolveUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

// Menú traducido y configurado
const sidebarNavItems: NavItem[] = [
    {
        title: 'Profila', // Profile
        href: edit(),
        icon: null,
    },
    {
        title: 'Pasahitza', // Password
        href: editPassword(),
        icon: null,
    },
    {
        title: 'Bi urratsen autentifikazioa', // Two-Factor Auth
        href: show(),
        icon: null,
    },
];

// Color corporativo
const customGreen = '#00796B';

export default function SettingsLayout({ children }: PropsWithChildren) {
    // Evitar renderizado en servidor si no hay ventana (seguridad standard de Inertia)
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="min-h-screen w-full p-4 md:p-10" style={{ backgroundColor: '#f3f4f6' }}>

            {/* Contenedor Centrado */}
            <div className="max-w-6xl mx-auto">

                <div className="mb-8 ml-2">
                    <Heading
                        title="Ezarpenak" // Settings
                        description="Kudeatu zure profilaren eta kontuaren ezarpenak" // Manage settings...
                    />
                </div>
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[500px]">
                    <aside className="w-full lg:w-72 bg-gray-50 p-6 lg:border-r border-gray-100">
                        <nav className="flex flex-col space-y-2">
                            {sidebarNavItems.map((item, index) => {
                                const isActive = isSameUrl(currentPath, item.href);
                                return (
                                    <Button
                                        key={`${resolveUrl(item.href)}-${index}`}
                                        variant="ghost"
                                        asChild
                                        className={cn(
                                            'w-full justify-start text-base font-medium transition-all duration-200',
                                            isActive
                                                ? 'bg-white text-[#00796B] shadow-sm border border-gray-100'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        )}
                                    >
                                        <Link href={item.href}>
                                            {item.icon && (
                                                <item.icon className="mr-2 h-4 w-4" />
                                            )}
                                            {item.title}
                                        </Link>
                                    </Button>
                                );
                            })}
                        </nav>
                    </aside>
                    <Separator className="lg:hidden" />
                    <div className="flex-1 p-8 lg:p-12">
                        <div className="max-w-2xl mx-auto lg:mx-0">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
