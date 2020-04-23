import { post, put, fetch, fetchDelete } from '@/httpConfig/http';

const goodsApi = {
	getGoodsList (params={}) {
		return fetch('/goods', params);
	},

	deleteGoods (params={}) {
		return fetchDelete('/goods/' + params.id, params);
	},

	deleteList (params={}) {
		return fetchDelete('/goods/delete', params);
	},

	getGoodsInfo (params={}) {
		return fetch('/goods/' + params.id);
	},

	addGoods (params={}) {
		return post('/goods', params);
	}
}

export default goodsApi;