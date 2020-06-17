// import Vue from 'vue'
import VueRouter from 'vue-router'

	// 正常路由配置
import Index from '@/views/Index'	
import Login from '@/views/Public/login'	
import Home from '@/views/Home/index'	
import Goods from '@/views/Goods/index'	
import GoodsEdit from '@/views/Goods/edit'	
import GoodsAdd from '@/views/Goods/add'	
import Category from '@/views/Category/index'	
import Order from '@/views/Order/index'	
import OrderDetail from '@/views/Order/detail'	
import Poster from '@/views/Poster/index'	
import Member from '@/views/Member/index'	
import Setting from '@/views/Setting/index'	
		
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
				},{
					path: "/poster",
					name: "poster",
					meta: {
						nav: 'poster'
					},
					component: Poster
				},{
					path: "/order",
					name: "order",
					meta: {
						nav: 'order'
					},
					component: Order
				},{
					path: "/order-detail/:id",
					name: "order-detail",
					meta: {
						nav: 'order'
					},
					component: OrderDetail
				},{
					path: "/member",
					name: "member",
					meta: {
						nav: 'member'
					},
					component: Member
				},{
					path: "/setting",
					name: "setting",
					meta: {
						nav: 'setting'
					},
					component: Setting
				}
			]
		}, {
			path: "/login",
			name: "login",
			component: Login
		}
	]
})



