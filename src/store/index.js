import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'				// 未使用modules情况下使用
// import actions from './actions'
// import mutations from './mutations'

import user from './modules/user'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		setting,
	}
})