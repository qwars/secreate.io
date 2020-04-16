const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    context: __dirname + '/develop',
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: '/index.html' }
            ]
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'secreate.io :: client-master', base: '/'}),
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true            
        }),
	new CopyWebpackPlugin([
	    {
		cache: true,
		from: './favicon.ico',
		to: './favicon.ico'
	    },
	    {
		cache: true,
		from: './404.html',
		to: './404.html'
	    }
	],{ copyUnmodified: true })
    ],    
    module: {
	rules: [
            {
                test: /images.+\.(jpe?g|png|gif|svg|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        useRelativePath: true,
                        outputPath: 'images',
                        publicPath: 'images'
                    }
                }]
            },
            {
                test: /fonts.+\.(woff(2)?|ttf|eot|svg)([?#]+\w+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        useRelativePath: true,
                        outputPath: '/fonts',
                        publicPath: '/fonts'
                    }
                }]
            },            
            {
                test: /\.styl$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
	        	    plugins: [
                                require('autoprefixer'),
                                require('cssnano')({preset: ['default']})
                            ],
	        	    sourceMap: true
	        	}
                    },                    
                    { loader: 'stylus-loader' }
                ]
            },
            {
	        test: /\.css$/,
                use: [                    
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
	        	    plugins: [
                                require('autoprefixer')
                            ],
	        	    sourceMap: true
	        	}
                    }
                ]
	    },
	    {
		test: /\.imba$/,
		loader: 'imba/loader',
	    }
	]
    },
    resolve: {
	extensions: [".imba", ".js", ".json"]
    },
    entry: "./index.imba",
    output: {
	path: __dirname + "/public",
	filename: "javascripts/application.js"
    }
}
