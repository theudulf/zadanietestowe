const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        "./src/js/index.js",
        "./src/scss/styles.scss"
    ],
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "./dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/bundle.css"
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/img', to: 'img' },
              { from: './node_modules/@fortawesome/fontawesome-free/webfonts', to: './webfonts'}
            ],
        }),
    ],
    devServer: {
        writeToDisk: true
    },
    watch: false,
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                // Apply rule for .sass, .scss or .css files
                test: /\.(sa|sc|c)ss$/,
          
                // Set loaders to transform files.
                // Loaders are applying from right to left(!)
                // The first loader will be applied after others
                use: [
                    {
                        // After all CSS loaders we use plugin to do his work.
                        // It gets all transformed CSS and extracts it into separate
                        // single bundled file
                        loader: MiniCssExtractPlugin.loader
                      }, 
                       {
                         // This loader resolves url() and @imports inside CSS
                         loader: "css-loader",
                         options: { url: false, sourceMap: true }
                       },
                       {
                         // First we transform SASS to standard CSS
                         loader: "sass-loader",
                         options: {
                           implementation: require("sass")
                         }
                       }
                     ]
              }
        ],
    },
};
