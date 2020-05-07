import { post, put, fetch, fetchDelete, postUpload } from '@/httpConfig/http';

const orderApi = {
	getList (params={}) {
		return fetch('/order', params);
	},

	deleteOrder (params={}) {
		return fetchDelete('/order/' + params.id, params);
	},

	getOrderInfo (params={}) {
		return fetch('/order/' + params.id);
	},

	updateOrder (params={}) {
		return put('/order/' + params.id, params);
	},
}

export default orderApi;