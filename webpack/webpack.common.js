const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssExtractLoaderConfig = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: '',
    },
};

const CORE_DIR = path.resolve(__dirname, '../node_modules');
const SRC_DIR = path.resolve(__dirname, '../src');
const IMAGES_DIR = path.resolve(__dirname, '../src/ui/assets/images');

module.exports = {
    entry: path.resolve(__dirname, '../', 'src') + '/app.ts',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
                include: [SRC_DIR],
            },
            {
                test: /\.css$/,
                use: [
                    cssExtractLoaderConfig,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]_[local]_[contenthash:base64:5]',
                            },
                        },
                    },
                ],
                exclude: [CORE_DIR],
            },
            {
                test: /\.(less|css)?$/,
                use: [
                    cssExtractLoaderConfig,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    nodeModulesPath: '~',
                                    coreModulePath: '~',
                                },
                            },
                        },
                    },
                ],
                include: [CORE_DIR],
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                include: [IMAGES_DIR],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
};
