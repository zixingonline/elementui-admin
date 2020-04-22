import Vue from 'vue'
import VueRouter from 'vue-router'

	// 正常路由配置
import Index from '@/views/Index'	
import Login from '@/views/Public/login'	
import Home from '@/views/Home/index'	
import Goods from '@/views/Goods/index'	
import GoodsEdit from '@/views/Goods/edit'	
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
				},{
					path: "/goods",
					name: "goods",
					component: Goods
				},{
					path: "/goods-edit/:id",
					name: "goods-edit",
					component: GoodsEdit
				}
			]
		}, {
			path: "/login",
			name: "login",
			component: Login
		}
	]
})



