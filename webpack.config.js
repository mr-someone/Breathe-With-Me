const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');

const entrypoints = [
    'babel-polyfill',
    'materialize-loader',
    './src/index.js',
    './src/css/style.scss',
];

module.exports = {
    mode: 'production',
    entry: entrypoints,
    output: {
        path: path.resolve(__dirname, 'prod'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            TweenLite: path.resolve('node_modules', 'gsap/src/minified/TweenLite.min.js'),
            TweenMax: path.resolve('node_modules', 'gsap/src/minified/TweenMax.min.js'),
            TimelineLite: path.resolve('node_modules', 'gsap/src/minified/TimelineLite.min.js'),
            TimelineMax: path.resolve('node_modules', 'gsap/src/minified/TimelineMax.min.js'),
            CSSPlugin: path.resolve('node_modules', 'gsap/src/minified/plugins/CSSPlugin.min.js'),
            Draggable: path.resolve('node_modules', 'gsap/src/minified/utils/Draggable.min.js'),
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
        }, {
            test: /\.html$/,
            use: ['babel-loader', 'html-loader'],
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'url?limit=10000&mimetype=application/font-woff',
        }, {
            test: /\.(jpg|jpeg|gif|png|ttf|eot|svg|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'file-loader',
        }],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new AppCachePlugin({
            cache: [
                'breathe.appcache',
                'manifest.json',
                'catLanding.png',
                'Podington_Bear_-_Floating_In_Space.mp3',
                'splash.png',
                'splash_iphone6.png',
                'splash_iphone6plus.png',
                'splash_ipad.png',
                'https://fonts.googleapis.com/css?family=Lato',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
            ],
            network: ['*'],
            fallback: [],
            settings: ['prefer-online'],
            exclude: [],
            output: 'breathe.appcache',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new CopyWebpackPlugin([
            {from: 'src/assets/images/catLanding.png'},
            {from: 'src/assets/sounds/Podington_Bear_-_Floating_In_Space.mp3'},
            {from: 'src/assets/images/splash.png'},
            {from: 'src/assets/images/splash_iphone6.png'},
            {from: 'src/assets/images/splash_iphone6plus.png'},
            {from: 'src/assets/images/splash_ipad.png'},
            {from: 'src/manifest.json'},
        ]),
        new SWPrecacheWebpackPlugin({
            cacheId: 'pages-cache-v1',
            filename: 'service-worker.js',
            maximumFileSizeToCacheInBytes: 10000000,
            runtimeCaching: [{
                handler: 'cacheFirst',
                urlPattern: /[.](mp3|json|png|js)$/,
            }, {
                handler: 'cacheFirst',
                urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            }],
        }),
    ]
};
