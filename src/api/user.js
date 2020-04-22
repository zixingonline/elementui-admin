import { post, put, fetch, fetchDelete } from '@/httpConfig/http';

export function login (params) {
	return post('/user/login', params);
}

export function logout () {
	return post('/user/logout', {});
}

