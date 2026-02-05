<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
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

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!--@routes-->
        @vite(['resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <script>
            window.interdeal = {
                get sitekey (){ return "7e5aa89f18a26474bb2786c02e3815d0"} ,
                get domains(){
                    return {
                        "js": "https://cdn.equalweb.com/",
                        "acc": "https://access.equalweb.com/"
                    }
                },
                "Position": "left",
                "Menulang": "ES",
                "draggable": true,
                "btnStyle": {
                    "vPosition": [ "80%", "80%" ],
                    "margin": [ "0", "0" ],
                    "scale": [ "0.5", "0.5" ],
                    "color": {
                        "main": "#1c4bb6",
                        "second": "#ffffff"
                    },
                    "icon": {
                        "outline": false,
                        "outlineColor": "#ffffff",
                        "type": 1 ,
                        "shape": "circle"
                    }
                },
            };

            (function(doc, head, body){
                var coreCall = doc.createElement('script');
                coreCall.src = interdeal.domains.js + 'core/5.2.5/accessibility.js';
                coreCall.defer = true;
                coreCall.integrity = 'sha512-Zamp30ps601kXvZTcIYv1sytUc090mrEJD9rLuoWzEGqmB6t0XdLRgC/g5TznUleEBIMm6T3c6Baf/ExIYh/Hw==';
                coreCall.crossOrigin = 'anonymous';
                coreCall.setAttribute('data-cfasync', true );
                body? body.appendChild(coreCall) : head.appendChild(coreCall);
            })(document, document.head, document.body);
        </script>
        <footer class="w-full py-6 text-center text-white text-sm font-medium mt-auto"
        style="background-color: {{ $customGreen ?? '#0f766e' }};">
    © 2026 Pisukide. — Edukia Creative Commons Atribuzioa–Ez Komertziala–Partekatu Berdin 4.0
    Nazioartekoa (CC BY-NC-SA 4.0) lizentziapean dago.
        </footer>
    </body>
</html>