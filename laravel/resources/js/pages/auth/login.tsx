import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';

// El mismo color verde que en el Welcome
const customGreen = '#00796B';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <>
            <Head title="Log in" />

            {/* --- ESTRUCTURA PRINCIPAL (FONDO GRIS) --- */}
            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>

                {/* --- HEADER VERDE (Igual que en Welcome) --- */}
                <header className="w-full py-5 shadow-md" style={{ backgroundColor: customGreen }}>
                    <div className="max-w-4xl mx-auto px-6 text-white flex items-center justify-between text-lg font-medium">
                        {/* Logo o Título a la izquierda para volver al inicio */}
                        <Link href="/" className="font-bold hover:opacity-80 transition">
                            PISUKIDE
                        </Link>
                        {canRegister && (
                            <div className="text-base">
                                Ez duzu konturik?{' '}
                                <Link href={register()} className="underline hover:text-gray-200 ml-1">
                                    Kontua Sortu
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                {/* --- CONTENIDO PRINCIPAL (TARJETA BLANCA) --- */}
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10 md:p-12">

                        {/* Título del Formulario */}
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                            Hasi Saioa
                        </h2>

                        {status && (
                            <div className="mb-6 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded">
                                {status}
                            </div>
                        )}

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email helbidea</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="zure@emaila.com"
                                                className="rounded-lg py-2 text-black"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password">Pasahitza</Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-sm text-gray-500 hover:text-teal-700"
                                                        tabIndex={5}
                                                    >
                                                        Pasahitza ahaztu duzu?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                className="rounded-lg py-2 text-black"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                                className="text-teal-700 focus:ring-teal-700"
                                            />
                                            <Label htmlFor="remember" className="text-gray-600">Gogoratu nirekin</Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-2 w-full text-lg py-6 rounded-xl hover:opacity-90 transition shadow-md"
                                            style={{ backgroundColor: customGreen, color: 'white' }}
                                            tabIndex={4}
                                            disabled={processing}
                                        >
                                            {processing && <Spinner className="mr-2 text-white" />}
                                            Sartu
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </main>
            </div>
        </>
    );
}
