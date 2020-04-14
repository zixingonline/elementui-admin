<template>
	<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" 
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

		<template v-for="item in menuList" v-if="!item.subMenu">
		  	<el-menu-item index="1" route="/home">
			    <i class="el-icon-menu"></i>
			    <span slot="title">HOME</span>
		  	</el-menu-item>
	  	</template>
	  	<template v-for="item in menuList" v-if="item.subMenu">
		  	<el-submenu :index="item.id">
			    <template slot="title">
					<i class="el-icon-date"></i>
					<span slot="title">{{item.title}}</span>
			    </template>

				<el-menu-item v-for="subItem in item.subMenu" :index="subItem.id" :route="subItem.route">{{subItem.title}}</el-menu-item>
		  	</el-submenu>	
	  	</template>
	</el-menu>
</template>
<script>
	const menuData = [{
		id: '1',
		title: "HOME",
		route: "/home"
	},{
		id: '2',
		title: "TABLE",
		route: "#",
		subMenu: [{
			id: '2-1',
			title: "Dynamic Table",
			route: "/table"
		}]
	}]
	export default {
		data () {
			return {
				menuList: menuData,
				bgColor: "#304156",
				textColor: "#bfcbd9",
				activeTextColor: "#67C23A",
				activeIndex: "1",
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
		}
	}
</script>