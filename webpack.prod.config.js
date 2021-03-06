// process.env.NODE_ENV = 'production'
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');			// 清空文件夹插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');		// css压缩

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
	plugins: [
		new CleanWebpackPlugin(),		// 清理dist文件夹
		new OptimizeCSSAssetsPlugin(),

		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerHost: '127.0.0.1',
			analyzerPort: 8899,
			reportFilename: 'report.html',
			defaultSizes: 'parsed',
			openAnalyzer: true,
			generateStatsFile: false,
			statsFilename: 'stats.json',
			statsOptions: null,
			logLevel: 'info'
        }),
	],

	optimization: {
		runtimeChunk: {						// 该项会导致开发环境热更模块失效
		  	name: 'manifest'
		}
	}
})

