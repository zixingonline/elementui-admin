import utils from '@/static/js/utils'
import { login, logout } from '@/api/user'

const state = {
	token: utils.getStorage('token'),
	account: utils.getStorage('account'),
	uid: utils.getStorage('uid'),
}

const mutations = {
	SET_TOKEN: (state, payload) => {
		state.token = payload.token;
	},

	SET_INFO: (state, payload) => {
		state.account = payload.account ? payload.account : '';
		state.uid = payload.id ? payload.id : '';
	},
}

const actions = {
	loginActions ({commit}, payload) {
		return new Promise((resolve, reject) => {
			login(payload)
				.then(res => {
					const { data } = res;
					const info = {
						account: data.account,
						uid: data.uid
					}
					utils.setStorage('token', data.token);
					utils.setStorage('account', data.account);
					utils.setStorage('uid', data.uid);
					commit('SET_TOKEN', data.token);
					commit('SET_INFO', info);
					resolve(res);
				})
		})
	},

	logoutActions ({commit}, payload={}) {
		return new Promise((resolve, reject) => {
			logout(payload)
				.then(res => {
					const { data } = res;
					const info = {
						account: data.account,
						uid: data.uid
					}
					utils.setStorage('token', '');
					utils.setStorage('account', '');
					utils.setStorage('uid', '');
					commit('SET_TOKEN', '');
					commit('SET_INFO', {});
					resolve(res);
				})
		}) 
	}
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
