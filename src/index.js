// import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import global from '@js/global'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from '@/views/App'
import utils from '@js/utils'
import { message } from '@/components/MessageBox'

// Vue.use(ElementUI)
Vue.prototype.$message = message;

// Vue.use(window.VueQuillEditor)

import '@/static/css/common.less'				// 默认less文件
import '@/static/css/reset.css'
		
import { post, put, fetch, fetchDelete } from '@/httpConfig/http';		// axios配置 (默认重写了 { POST } 方法)
Vue.prototype.$post = post;						
Vue.prototype.$put = put;						
Vue.prototype.$fetch = fetch;						
Vue.prototype.$fetchDelete = fetchDelete;						
Vue.prototype.GLOBAL = global;					// 全局变量配置



router.beforeEach((to, from, next) => {			// 全局前置路由钩子
	if (to.name != 'login') {
		store.commit('setting/SETTING_ROUTE', {
			name: to.name, 
			path: to.path,
			params: to.params,
		});	
	}
	
	const accessToken = utils.getStorage('token');
	if (accessToken) {
		if (to.path == "/login") {
			next({
				path: "/"
			})
		}
		next();
	} else {
		if (to.path != "/login") {
			next({
				path: "/login?redirect=" + to.path
			})	
		} else {
			next();
		}
	}
})



new Vue({
	el: "#app",
	router,
	store,
	template: '<App/>',
	components: {App},
})