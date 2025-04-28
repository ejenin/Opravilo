const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.tsx',
    
    devtool: 'inline-source-map',
    
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            eslintPath: require.resolve('eslint'),

                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                },
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg|gif|ttf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'assets/[hash]-[name].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    
    plugins: [
        new htmlWebpackPlugin({
            filename: "../public/index.html",
            title: "Development",
            template: "templates/template.html"
        }),
        new Dotenv(),
    ],

    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        open: true,
        historyApiFallback: true,
      },
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        clean: true
    },
};