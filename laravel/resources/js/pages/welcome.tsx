import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { BookOpenIcon, GlobeAltIcon, NewspaperIcon, PlayIcon } from '@heroicons/react/24/outline';
import SvgIcon from '@/components/ui/svgIcons';

const customGreen = '#00ba7c';

export default function Welcome({ canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <Head title="PISUKIDE" />
            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>
                {/* --- TOP BAR VERDE --- */}
                <header className="w-full py-5 shadow-md" style={{ backgroundColor: '#00796B' }}>
                    <div className="max-w-4xl mx-auto px-6 text-white flex items-center justify-end text-lg font-medium">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className='hover:underline'
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className='hover:underline'
                                >
                                    Hasi Saioa
                                </Link>
                                <span className="mx-4 opacity-60">|</span>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className='hover:underline'
                                    >
                                        Kontua Sortu
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </header>
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl p-10 md:p-16 text-center">
                        {/* Título Principal */}
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-12">
                            ONGI ENTORRI PISUKIDE APLIKAZIORA
                        </h2>
                        <div className="flex justify-center items-center mb-8">
                            <SvgIcon className='w-full h-auto' />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
