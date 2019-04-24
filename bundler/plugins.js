/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Generate HTML Document from JS
 */
const generateHTML = (
    pageTitle = 'Lajban Prototype',
    meta = {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    }
) =>
    new HtmlWebpackPlugin({
        title: pageTitle,
        meta: meta,
    });

/**
 * Generate manifest.json file
 */
const generateManifestJson = () =>
    new ManifestPlugin({
        // Filter manifest items
        filter: function(file) {
            // Don't include source maps
            if (file.path.match(/\.(map)$/)) {
                return false;
            }
            return true;
        },
        // Custom mapping of manifest item goes here
        map: function(file) {
            // Fix incorrect key for fonts
            if (
                file.isAsset &&
                file.isModuleAsset &&
                file.path.match(/\.(woff|woff2|eot|ttf|otf)$/)
            ) {
                const pathParts = file.path.split('.');
                const nameParts = file.name.split('.');

                // Compare extensions
                if (pathParts[pathParts.length - 1] !== nameParts[nameParts.length - 1]) {
                    file.name = pathParts[0].concat('.', pathParts[pathParts.length - 1]);
                }
            }
            return file;
        },
    });

/**
 * Clean dist folder
 */
const cleanDistFolder = () => new CleanWebpackPlugin();

/**
 * Enables Hot Module Replacement
 */
const enableHMR = () => new webpack.HotModuleReplacementPlugin();

/**
 * Extract styles and generate CSS files
 */
const generateStylesheets = (fileName, chunkName) =>
    new MiniCssExtractPlugin({
        filename: fileName,
        chunkFilename: chunkName,
    });

module.exports = {
    generateHTML,
    generateManifestJson,
    cleanDistFolder,
    enableHMR,
    generateStylesheets,
};
