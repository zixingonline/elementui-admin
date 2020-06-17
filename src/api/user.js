import { post, put, fetch, fetchDelete } from '@/httpConfig/http';

const userApi = {
	login (params={}) {
		return post('/user/login', params);
	},

	logout (params={}) {
		return post('/user/logout', params);
	},

	getConfig (params={}) {
		return post('/user/getConfig', params);
	},

	updateConfig (params={}) {
		return post('/user/updateConfig', params);
	},
}

export default userApi;

