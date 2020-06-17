<template>
	<div class="header flex-between">
		<a href="javascript:void(0)" class="aside-switch flex-center" @click="asideSwitch()">
			<i class="el-icon-s-fold" v-if="isCollapse"></i>
			<i class="el-icon-s-unfold" v-else></i>
		</a>

		<div class="header-user">
			<el-dropdown trigger="click">
				<div class="user-avatar flex-center">
					<img src="~@/static/image/default-avatar.gif" alt="">

					<i class="el-icon-caret-bottom"></i>
				</div>

				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>设置</el-dropdown-item>
				    <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
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
				this.$store.commit('setting/TOGGLE_SIDEBAR', {status: status});
			},

			logout () {
				this.$confirm('确认退出当前账号?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('user/logoutActions')
						.then(res => {
							console.log(res);
							this.$message({
								type: 'success',
								message: '退出成功!'
							});
							this.$router.push('/login?redirect=' + this.$route.fullPath);
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '退出失败！'
					});          
				});
			}
		}
	}
</script>