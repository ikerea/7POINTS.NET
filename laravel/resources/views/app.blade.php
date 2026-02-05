<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- ======================================================================= --}}
        {{-- HASIERA: SMO (Social Media Optimization) & SEO --}}
        {{-- ======================================================================= --}}

        {{-- Deskripzioa Googlerentzat (Euskeraz eta kudeaketara bideratuta) --}}
        <meta name="description" content="{{ $meta['description'] ?? 'Zure pisua kudeatzeko aplikazioa. Antolatu gastuak, zereginak eta erosketak zure pisukideekin erraz.' }}">
        <meta name="keywords" content="pisukide, pisua kudeatu, gastuak, garbiketa, ikasle pisuak, elkarbizitza">
        <meta name="author" content="{{ config('app.name', 'Pisukide') }}">

        {{-- Open Graph / Facebook / WhatsApp / LinkedIn --}}
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ $meta['title'] ?? config('app.name', 'Pisukide') }}">
        <meta property="og:description" content="{{ $meta['description'] ?? 'Zure pisua kudeatzeko aplikazioa. Antolatu gastuak eta zereginak leku bakarretik.' }}">

        {{-- Irudia: public/images/SMOPhoto.png --}}
        <meta property="og:image" content="{{ asset($meta['image'] ?? 'images/SMOPhoto.png') }}">
        <meta property="og:site_name" content="{{ config('app.name', 'Pisukide') }}">
        <meta property="og:locale" content="eu_ES">

        {{-- Twitter Cards --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="{{ url()->current() }}">
        <meta name="twitter:title" content="{{ $meta['title'] ?? config('app.name', 'Pisukide') }}">
        <meta name="twitter:description" content="{{ $meta['description'] ?? 'Zure pisua kudeatzeko aplikazioa. Antolatu gastuak eta zereginak leku bakarretik.' }}">
        <meta name="twitter:image" content="{{ asset($meta['image'] ?? 'images/SMOPhoto.png') }}">

        {{-- ======================================================================= --}}
        {{-- AMAIERA: SMO --}}
        {{-- ======================================================================= --}}

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Pisukide') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
