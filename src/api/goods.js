import { post, put, fetch, fetchDelete, postUpload } from '@/httpConfig/http';

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
	},

	editGoods (params={}) {
		return put('/goods/' + params.id, params);
	},

	deleteGoodsPict (params={}) {
		return post('/goods/deletGoodsPict', params);
	},

	getClassList (params={}) {
		return post('/goods/getClassList', params);
	},

	getCategoryList (params={}) {
		return fetch('/category', params);
	},

	deleteCategory (params={}) {
		return fetchDelete('/category/' + params.id);
	},

	deleteCategoryList (params={}) {
		return fetchDelete('/category/deleteAll', params);
	},
}

export default goodsApi;