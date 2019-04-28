/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

const { Scripts, Styles, Images, Fonts } = require('./loaders');
const { generateHTML, generateManifestJson, cleanDistFolder, enableHMR } = require('./plugins');

/**
 * Common configuration - shared with dev & production build
 * ----------------------------------------------------------------------------
 */
module.exports = {
    /**
     * Good place to start! Place your entries here
     * ------------------------------------------------------------------------
     */
    entry: {
        app: './client/index.js',
    },
    /**
     * Plugins can solve problems, try add some
     * ------------------------------------------------------------------------
     */
    plugins: [
        generateHTML('Laiban Prototype'),
        generateManifestJson(),
        cleanDistFolder(),
        enableHMR(),
    ],
    module: {
        /**
         * This is where the good stuf happens! Common loaders goes here
         * --------------------------------------------------------------------
         */
        rules: [
            Scripts(/\.jsx?/),
            Styles(/\.(sa|sc|c)ss$/),
            Images(/\.(png|svg|jpg|gif)$/),
            Fonts(/\.(woff|woff2|eot|ttf|otf)$/),
        ],
    },
    /**
     * Not happy with the output? Maybe this can help
     * -------------------------------------------------------------------------
     */
    output: {
        filename: devMode ? '[name].bundle.js' : '[name].[hash:8].js',
        chunkFilename: devMode ? '[id].js' : '[id].[hash:8].js',
        path: path.resolve(process.cwd(), 'public'),
    },
};
