import utils from '@/static/js/utils'

const state = {
	sidebarCollapse: utils.getStorage('sidebarCollapse') == undefined ? 0 : utils.getStorage('sidebarCollapse'),
	historyRoute: [],
}

const mutations = {
	TOGGLE_SIDEBAR (state, payload) {
		state.sidebarCollapse = payload.status;
		let lsStatus;
		if (payload.status) {
			lsStatus = 1;
		} else {
			lsStatus = 0;
		}
		utils.setStorage("sidebarCollapse", lsStatus);
	},
	SETTING_ROUTE (state, payload) {
		state.historyRoute.map((item, index) => {
			if (payload.path == item.path) {
				state.historyRoute.splice(index, 1);
			}
		})

		let route = {
			name: payload.params.id ? payload.name + '-' + payload.params.id : payload.name,
			path: payload.path,
			params: payload.params,
		}
		state.historyRoute.push(route);

		if (state.historyRoute.length > 10) {
			state.historyRoute.splice(10, 1);
		};
	},
}

const actions = {
	
}


export default {
	namespaced: true,
	state,
	mutations,
	actions
}
