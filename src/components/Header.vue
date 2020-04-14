<template>
	<div class="header flex-between">
		<a href="javascript:void(0)" class="aside-switch flex-center" @click="asideSwitch()">
			<i class="el-icon-s-fold" v-if="isCollapse"></i>
			<i class="el-icon-s-unfold" v-else></i>
		</a>
	</div>
</template>
<script>
	export default {
		data () {
			return {}
		},
		props: ['isCollapse'],
		methods: {
			asideSwitch () {
				let status = this.isCollapse;
				status = !status;
				this.$emit('asideSwitch', status);
				this.$store.commit('TOGGLE_SIDEBAR', {status: status});
			}
		}
	}
</script>