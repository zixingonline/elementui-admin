const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');

module.exports = merge(baseConfig, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		proxy: {					// 设置代理、跨域请求
		    '/api': {
				target: 'http://test.yesnbst.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	},

	plugins: [
		
	],
})


