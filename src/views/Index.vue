<template>
    <div id="app" class="flex">
    	<el-container>
			<el-aside :width="asideWidth">
				<Aside :isCollapse="menuIsCollapse" />
			</el-aside>

			<el-container>
				<el-header>
					<Header @asideSwitch="switchHandler" :isCollapse="menuIsCollapse" />
				</el-header>
                
                <HistoryRouter />

				<el-main>
                    <transition name="fade-transform" mode="out-in">
                        <!-- <keep-alive :include="cacheList"> -->
                        <keep-alive>
    					   <router-view :key="$route.fullPath" />
                        </keep-alive>
                    </transition>
				</el-main>
			</el-container>
		</el-container>
    </div>
</template>
<script>
	import Header from '@/components/Header'
    import Aside from '@/components/Aside'
	import HistoryRouter from '@/components/HistoryRouter'

    export default {
        data() {
            return {
                menuIsCollapse: false,
                cacheList: ['home', 'goods', 'order', 'order-detail'],
            }
        },
        components: {
        	Header,
        	Aside,
            HistoryRouter,
        },
        created () {
            if (this.$store.state.setting.sidebarCollapse == 1) {
                this.menuIsCollapse = true;
            } else {
                this.menuIsCollapse = false;
            }
        },
        computed: {
        	asideWidth () {
        		return this.menuIsCollapse ? '65px' : '210px';
        	}
        },
        methods: {
        	switchHandler (status) {
        		this.menuIsCollapse = status;
        	}
        },
    }
</script>
<style>
	html, body, .wrap, #app {
		height: 100%;
		width: 100%;
	}
    .el-main {
        overflow-x: hidden;
    }
</style>