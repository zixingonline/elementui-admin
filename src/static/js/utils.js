/*
 * utils.js工具函数文件
 * 引入方法：import utils from '@/static/js/utils'
 * 使用方法：utils.utilsDemoFunc()
 */ 
import Cookies from 'js-cookie'
const utils = {
	getStorage (key) {
		return Cookies.get(key);
	},	

	setStorage (key, value) {
		return Cookies.set(key, value);
	},

	removeStorage (key) {
		return Cookies.remove(key);
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

	orderStatusClass (status) {
		switch (status) {
			case -1:
				return 'text-default';
				break;
			case 0:
				return 'text-error';
				break;
			case 1:
				return 'text-success';
				break;
			case 2:
				return 'text-wait';
				break;
			case 3:
				return 'text-default';
				break;
			case 4:
				return 'text-success';
				break;
			case 5:
				return 'text-error';
				break;
			case 6:
				return 'text-error';
				break;
			case 7:
				return 'text-success';
				break;
			case 8:
				return 'text-wait';
				break;
			case 9:
				return 'text-success';
				break;
			default:
				return 'text-default';
		}
	},

	orderStatus (status) {
		switch (status) {
			case -1:
				return '取消订单';
				break;
			case 0:
				return '未支付';
				break;
			case 1:
				return '已支付';
				break;
			case 2:
				return '发货中';
				break;
			case 3:
				return '已发货';
				break;
			case 4:
				return '已收货';
				break;
			case 5:
				return '退货审核';
				break;
			case 6:
				return '审核失败';
				break;
			case 7:
				return '审核成功';
				break;
			case 8:
				return '退款中';
				break;
			case 9:
				return '退款成功';
				break;
			default:
				return '未知';
		}
	},

	payType (type) {
		switch (type) {
			case 1:
				return '微信支付';
				break;
			case 2:
				return '支付宝';
				break;
			case 3:
				return '银联';
				break;
			default:
				return '-';
		}
	}
}

export default utils

