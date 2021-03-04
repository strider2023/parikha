const path = require("path");

{/* <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png"> */}
module.exports = {
    rootPath: path.join(__dirname, "../routes"),
    head: {
        title: "Parīkṣā",
        metas: [{
                name: "viewport",
                content: "width=device-width,initial-scale=1"
            },
            {
                charset: "utf-8"
            },
            {
                name: 'application-name',
                content: 'Parikha'
            },
            {
                name: 'theme-color',
                content: '#ffffff'
            },
            {
                name: 'manifest',
                content: '/assets/favicons/manifest.json'
            },
            {
                name: 'description',
                content: 'An assessment application.',
                id: 'desc'
            },
            {
                rel: 'icon',
                type: 'image/png',
                href: '/assets/favicons/favicon-16x16.png',
                sizes: '16x16'
            },
            {
                rel: 'icon',
                type: 'image/png',
                href: '/assets/favicons/favicon-32x32.png',
                sizes: '32x32'
            },
            {
                rel: 'icon',
                type: 'image/png',
                href: '/assets/favicons/favicon-32x32.png',
                sizes: '96x96'
            }
        ],
        styles: [{
                style: "/assets/rendered/style.css"
            },
            {
                src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
                rel: "stylesheet",
                integrity: "sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1",
                crossorigin: "anonymous"
            }, {
                src: "/assets/external/notiflix-2.6.0.min.css",
                rel: "stylesheet"
            }
        ],
        scripts: [{
            src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
            integrity: "sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW",
            crossorigin: "anonymous"
        }, {
            src: "https://unpkg.com/axios/dist/axios.min.js",
        }, {
            src: "/assets/external/notiflix-2.6.0.min.js",
        }, {
            src: "/assets/external/notiflix-aio-2.6.0.min.js",
        }, {
            src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        }]
    },
};