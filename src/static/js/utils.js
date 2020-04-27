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

	timeInit (timestamp) {
		let time = new Date(timestamp*1000);
		let year = time.getFullYear();
		let month = time.getMonth() + 1;
		let date = time.getDate();
		let hour = time.getHours();
		let min = time.getMinutes();
		let sec = time.getSeconds();

		return year + "-" + this.strInit(month) + "-" + this.strInit(date) + " " + this.strInit(hour) + ":" + this.strInit(min) + ":" + this.strInit(sec);
	},

	strInit (str) {
		if (str < 10) {
			return '0' + str;
		}
		return str;
	},
}

export default utils

