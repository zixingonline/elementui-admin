const ls = window.localStorage;
const mutations = {
	TOGGLE_SIDEBAR (state, payload) {
		state.sidebarCollapse = payload.status;
		let lsStatus;
		if (payload.status) {
			lsStatus = 1;
		} else {
			lsStatus = 0;
		}
		ls.setItem("sidebarCollapse", lsStatus);
	},
}

export default mutations