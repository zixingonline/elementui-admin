import Vue from 'vue'
import VueRouter from 'vue-router'

	// 正常路由配置
import Index from '@/views/Index'	
import Login from '@/views/Public/login'	
import Home from '@/views/Home/index'	
import Goods from '@/views/Goods/index'	
import GoodsEdit from '@/views/Goods/edit'	
import GoodsAdd from '@/views/Goods/add'	
import Category from '@/views/Category/index'	
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
					meta: {
						nav: 'home'
					},
					component: Home
				},{
					path: "/table",
					name: "table",
					meta: {
						nav: 'table'
					},
					component: Table
				},{
					path: "/goods",
					name: "goods",
					meta: {
						nav: 'goods'
					},
					component: Goods
				},{
					path: "/goods-edit/:id",
					name: "goods-edit",
					meta: {
						nav: 'goods'
					},
					component: GoodsEdit
				},{
					path: "/goods-add",
					name: "goods-add",
					meta: {
						nav: 'goods'
					},
					component: GoodsAdd
				},{
					path: "/category",
					name: "category",
					meta: {
						nav: 'category'
					},
					component: Category
				}
			]
		}, {
			path: "/login",
			name: "login",
			component: Login
		}
	]
})



