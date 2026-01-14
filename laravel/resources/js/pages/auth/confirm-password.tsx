import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';
import { Form, Head, Link } from '@inertiajs/react';

// Color corporativo
const customGreen = '#00796B';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Berretsi pasahitza" />

            {/* --- ESTRUCTURA PRINCIPAL (Fondo Gris) --- */}
            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10 md:p-12">

                        {/* Título */}
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                            Berretsi zure pasahitza
                        </h2>

                        {/* Descripción de seguridad traducida */}
                        <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
                            Hau aplikazioaren gune segurua da. Mesedez, berretsi zure pasahitza jarraitu aurretik.
                        </p>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <div className="space-y-6">

                                    {/* Campo: Password */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Pasahitza</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            autoFocus
                                            className="rounded-lg py-2 text-black"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Botón de Acción */}
                                    <div className="flex items-center">
                                        <Button
                                            className="w-full text-lg py-6 rounded-xl hover:opacity-90 transition shadow-md"
                                            style={{ backgroundColor: customGreen, color: 'white' }}
                                            disabled={processing}
                                            data-test="confirm-password-button"
                                        >
                                            {processing && <Spinner className="mr-2 text-white" />}
                                            Berretsi pasahitza
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Form>
                    </div>
                </main>
            </div>
        </>
    );
}
