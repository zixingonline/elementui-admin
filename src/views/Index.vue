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

				<el-main>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
    </div>
</template>
<script>
	import Header from '@/components/Header'
	import Aside from '@/components/Aside'

    export default {
        data() {
            return {
                menuIsCollapse: false,
            }
        },
        components: {
        	Header,
        	Aside
        },
        created () {
            if (this.$store.state.user.sidebarCollapse == 1) {
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
</style>