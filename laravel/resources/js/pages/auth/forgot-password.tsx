import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';

// Color corporativo
const customGreen = '#00796B';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Pasahitza Berreskuratu" />

            {/* --- ESTRUCTURA PRINCIPAL (Fondo Gris) --- */}
            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>

                {/* --- HEADER VERDE --- */}
                <header className="w-full py-5 shadow-md" style={{ backgroundColor: customGreen }}>
                    <div className="max-w-4xl mx-auto px-6 text-white flex items-center justify-between text-lg font-medium">
                        <Link href="/" className="font-bold hover:opacity-80 transition">
                            PISUKIDE
                        </Link>

                        {/* Enlace Header: Volver a Login */}
                        <div className="text-base">
                            Atzera itzuli?{' '}
                            <Link href={login()} className="underline hover:text-gray-200 ml-1">
                                Hasi Saioa
                            </Link>
                        </div>
                    </div>
                </header>

                {/* --- CONTENIDO PRINCIPAL (Tarjeta Blanca) --- */}
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10 md:p-12">

                        {/* Título */}
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                            Pasahitza ahaztu duzu?
                        </h2>

                        {/* Descripción traducida */}
                        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
                            Sartu zure email helbidea eta pasahitza berrezartzeko esteka bat bidaliko dizugu.
                        </p>

                        {/* Mensaje de estado (éxito al enviar correo) */}
                        {status && (
                            <div className="mb-6 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                                {status}
                            </div>
                        )}

                        <Form {...email.form()} className="flex flex-col gap-6">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">

                                        {/* Campo: Email */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email helbidea</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                autoComplete="off"
                                                autoFocus
                                                required
                                                placeholder="zure@emaila.com"
                                                className="rounded-lg py-2 text-black"
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                        <Button
                                            className="mt-2 w-full text-lg py-6 rounded-xl hover:opacity-90 transition shadow-md"
                                            style={{ backgroundColor: customGreen, color:'white'}}
                                            disabled={processing}
                                            data-test="email-password-reset-link-button"
                                        >
                                            {processing && <Spinner className="mr-2 text-white" />}
                                            Bidali berrezartzeko esteka
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>

                        {/* Pie de tarjeta con enlace a login */}
                        <div className="mt-8 text-center text-sm text-gray-500">
                            Gogoratu duzu?{' '}
                            <TextLink href={login()} className="font-medium text-teal-700 hover:text-teal-900">
                                Hasi Saioa
                            </TextLink>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
