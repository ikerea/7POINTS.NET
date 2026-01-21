import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, Link } from '@inertiajs/react';

// Mismo color verde corporativo
const customGreen = '#00796B';

export default function Register() {
    return (
        <>
            <Head title="Kontua Sortu" />
            <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#f3f4f6' }}>
                <header className="w-full py-5 shadow-md" style={{ backgroundColor: customGreen }}>
                    <div className="max-w-4xl mx-auto px-6 text-white flex items-center justify-between text-lg font-medium">
                        <Link href="/" className="font-bold hover:opacity-80 transition">
                            PISUKIDE
                        </Link>
                        <div className="text-base">
                            Baduzu konturik?{' '}
                            <Link href={login()} className="underline hover:text-gray-200 ml-1">
                                Hasi Saioa
                            </Link>
                        </div>
                    </div>
                </header>
                <main className="flex-grow flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-10 md:p-12">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                            Kontua Sortu
                        </h2>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name" className='text-black'>Izena</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Zure izena"
                                                className="rounded-lg py-2 text-black"
                                            />
                                            <InputError message={errors.name} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email" className='text-black'>Email helbidea</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                tabIndex={2}
                                                autoComplete="email"
                                                name="email"
                                                placeholder="zure@emaila.com"
                                                className="rounded-lg py-2 text-black"
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password" className='text-black'>Pasahitza</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                tabIndex={3}
                                                autoComplete="new-password"
                                                name="password"
                                                placeholder="••••••••"
                                                className="rounded-lg py-2 text-black"
                                            />
                                            <InputError message={errors.password} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation" className='text-black'>
                                                Pasahitza baieztatu
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                required
                                                tabIndex={4}
                                                autoComplete="new-password"
                                                name="password_confirmation"
                                                placeholder="••••••••"
                                                className="rounded-lg py-2 text-black"
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="mt-4 w-full text-lg py-6 rounded-xl hover:opacity-90 transition shadow-md"
                                            style={{ backgroundColor: customGreen, color: 'white' }}
                                            tabIndex={5}
                                            disabled={processing}
                                        >
                                            {processing && <Spinner className="mr-2 text-white" />}
                                            Sortu kontua
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
