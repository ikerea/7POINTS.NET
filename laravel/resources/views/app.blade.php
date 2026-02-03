<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <script>
            window.interdeal = {
                "sitekey": "38c73bbde50343409cd42939d229369a", // Tu clave real
                "Position": "left",
                "Menulang": "ES",
                "domains": {
                    "js": "https://cdn.equalweb.com/",
                    "acc": "https://access.equalweb.com/"
                },
                "btnStyle": {
                    "vPosition": ["80%", "80%"],
                    "scale": ["0.5", "0.5"],
                    "color": { "main": "#1c4bb6", "second": "#ffffff" },
                    "icon": { "type": 1, "shape": "circle" }
                }
            };
            (function(doc, head, body){
                var coreCall = doc.createElement('script');
                coreCall.src = 'https://cdn.equalweb.com/core/5.2.5/accessibility.js';
                coreCall.defer = true;
                coreCall.integrity = 'sha512-Zamp30ps601kXvZTcIYv1sytUc090mrEJD9rLuoWzEGqmB6t0XdLRgC/g5TznUleEBIMm6T3c6Baf/ExIYh/Hw==';
                coreCall.crossOrigin = 'anonymous';
                coreCall.setAttribute('data-cfasync', true );
                body? body.appendChild(coreCall) : head.appendChild(coreCall);
            })(document, document.head, document.body);
        </script>
        </body>
</html>