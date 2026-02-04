<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

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
    </body>
</html>