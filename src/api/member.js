import { post, put, fetch, fetchDelete, postUpload } from '@/httpConfig/http';

const memberApi = {
	getList (params={}) {
		return fetch('/member', params);
	},
}

export default memberApi;