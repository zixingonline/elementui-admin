import { post, put, get, fetchDelete } from '@/httpConfig/http';

export function login (params) {
	return post('/user/login', params);
}

