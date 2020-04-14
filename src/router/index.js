import Vue from 'vue'
import VueRouter from 'vue-router'

	// 正常路由配置
import Index from '@/views/Index'	
import Home from '@/views/Home/index'	
import Table from '@/views/Table/index'	
		
Vue.use(VueRouter)
export default new VueRouter({
	routes: [
		{		
			path: "/",
			name: "index",
			component: Index,
			redirect: "/home",
			children: [
				{
					path: "/home",
					name: "home",
					component: Home
				},{
					path: "/table",
					name: "table",
					component: Table
				}
			]
		},
	]
})



