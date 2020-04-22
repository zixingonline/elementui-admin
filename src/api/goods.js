import { post, put, fetch, fetchDelete } from '@/httpConfig/http';

export function getGoodsList (params={}) {
	return fetch('/goods', params);
}

export function deleteGoods (params={}) {
	return fetchDelete('/goods/' + params.id, params);
}

export function deleteList (params={}) {
	return fetchDelete('/goods/delete', params);
}

export function getGoodsInfo (params) {
	return fetch('/goods/' + params.id);
}
