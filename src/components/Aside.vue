<template>
	<el-menu :default-active="$route.meta.nav" router="true" class="el-menu-vertical-demo" 
		@open="handleOpen" 
		@close="handleClose" 
		@select="handleSelect"
		:collapse="isCollapse"
		:background-color="bgColor"
		:text-color="textColor"
		:active-text-color="activeTextColor"
		:collapse-transition="false"
		:router="true"
	>

		<template v-for="(item, index) in menuList">
		  	<el-menu-item :index="item.index" :route="item.route" :key="index" v-if="!item.subMenu">
			    <i :class="item.icon"></i>
			    <span slot="title">{{item.title}}</span>
		  	</el-menu-item>

		  	<el-submenu :index="item.index" :key="index" v-else>
			    <template slot="title">
					<i :class="item.icon"></i>
					<span slot="title">{{item.title}}</span>
			    </template>

				<el-menu-item v-for="(subItem, index) in item.subMenu" :index="subItem.index" :route="subItem.route" :key="index">{{subItem.title}}</el-menu-item>
		  	</el-submenu>
	  	</template>
	</el-menu>
</template>
<script>
	const menuData = [{
		index: 'home',
		title: "HOME",
		route: "/home",
		icon: "el-icon-s-shop"
	},{
		index: 'member',
		title: "MEMBER",
		route: "/member",
		icon: 'el-icon-user'
	},{
		index: 'goods',
		title: "GOODS",
		route: "#",
		icon: 'el-icon-goods',
		subMenu: [{
			index: 'goods',
			title: "LIST",
			route: "/goods"
		},{
			index: 'category',
			title: "CATEGORY",
			route: "/category"
		},{
			index: 'poster',
			title: "POSTER",
			route: "/poster"
		}]
	},{
		index: 'order',
		title: "ORDER",
		route: "#",
		icon: 'el-icon-s-order',
		subMenu: [{
			index: 'order',
			title: "LIST",
			route: "/order"
		}]
	},{
		index: 'setting',
		title: "SETTING",
		route: "/setting",
		icon: 'el-icon-setting'
	},]
	export default {
		data () {
			return {
				menuList: menuData,
				bgColor: "#304156",
				textColor: "#bfcbd9",
				activeTextColor: "#67C23A",
				activeIndex: "/home",
			}
		},
		props: ['isCollapse'],
		methods: {
			handleOpen () {},
			handleClose () {},
			handleSelect (index) {
				this.activeIndex = index;
			},
		},
		created () {
			let path = this.$route.path;
			this.menuList.map((item, index) => {
				if (item.subMenu) {
					item.subMenu.map((subItem) => {
						if (subItem.route === path) {
							this.activeIndex = subItem.id;
						}
					})
				} else {
					if (item.route === path) {
						this.activeIndex = item.id;
					}
				}
			})
		},
	}
</script>