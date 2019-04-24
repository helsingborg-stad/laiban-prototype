/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

const { generateStylesheets } = require('./plugins');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [generateStylesheets('[name].[contenthash:8].css', '[id].[contenthash:8].css')],
    optimization: {
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'production',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        splitChunks: {
            hidePathInfo: true,
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
        },
        noEmitOnErrors: true,
        checkWasmTypes: true,
        minimize: true,
        minimizer: [new OptimizeCSSAssetsPlugin()],
    },
});
