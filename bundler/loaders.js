/* eslint-disable import/no-extraneous-dependencies */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const devMode = process.env.NODE_ENV !== 'production';

/**
 * Scripts - Compiles ES2018 using Babel and transforms into enviroment-compatible Javascript.
 * @note Target specific browsers using the "browserslist" propety defined in package.json
 */
const Scripts = (regex = /\.m?js$/) => ({
    test: regex,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            // Babel config here
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-proposal-class-properties',
                'react-hot-loader/babel',
            ],
        },
    },
});

/**
 * Styles - Process CSS/SCSS/SASS imports found in entry files and transform to CSS
 */
const Styles = (regex = /\.(sa|sc|c)ss$/) => ({
    test: regex,
    use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => sass-loader
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [autoprefixer],
            },
        },
        'sass-loader',
    ],
});

/**
 * Images
 */
const Images = (regex = /\.(png|svg|jpg|gif)$/) => ({
    test: regex,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: devMode ? '[name].[ext]' : '[name].[contenthash:8].[ext]',
            },
        },
    ],
});

/**
 * Fonts
 */
const Fonts = (regex = /\.(woff|woff2|eot|ttf|otf)$/) => ({
    test: regex,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: devMode ? '[name].[ext]' : '[name].[contenthash:8].[ext]',
            },
        },
    ],
});

module.exports = { Scripts, Styles, Images, Fonts };
