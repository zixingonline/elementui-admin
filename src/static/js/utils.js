/*
 * utils.js工具函数文件
 * 引入方法：import utils from '@/static/js/utils'
 * 使用方法：utils.utilsDemoFunc()
 */ 
const ls = window.localStorage;
const utils = {
	getStorage (key) {
		return ls.getItem(key);
	},	

	setStorage (key, value) {
		return ls.setItem(key, value);
	},

	removeStorage (key) {
		ls.removeItem(key);
	},
}

export default utils

