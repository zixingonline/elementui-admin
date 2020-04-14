import Vue from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import global from '@/static/js/global'
import App from '@/views/App'


import { Container, Header, Main, Aside, Menu, Submenu, MenuItem, MenuItemGroup, Tooltip, Table, TableColumn, Button} from 'element-ui';
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tooltip);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);


import '@/static/css/common.less'				// 默认less文件
import '@/static/css/reset.css'
		
import { post } from '@/httpConfig/http'		// axios配置 (默认重写了 { POST } 方法)
Vue.prototype.$http = post;						
Vue.prototype.GLOBAL = global;					// 全局变量配置
router.beforeEach((to, from, next) => {			// 全局前置路由钩子
	if (to.meta.requireAuth) {

		// 权限验证代码 start
		// ...
		// ...
		// 权限验证代码 end

		next();
	} else {
		next();
	}
})

new Vue({
	el: "#app",
	router,
	store,
	template: '<App/>',
	components: {App},
})