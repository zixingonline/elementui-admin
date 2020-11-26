<template>
	<div class="history-router flex">
		<el-tag
		  v-for="(tag, index) in tags"
		  :key="index"
		  closable
		  type="info"
		  effect="plain"
		  :class="{'active': tag.path == $route.path}"
		  @close="handleClose(tag)"
		  @click="handleClick(tag)"
		  size="small">
		  {{tag.name}}
		</el-tag>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				tags: [],
			}
		},
		created () {
			this.initTags();
			this.tags = this.$store.state.setting.historyRoute;
		},
		methods: {
			initTags () {
				this.$store.commit('setting/SETTING_ROUTE', this.$route);	
			},
			handleClose (tag) {
				this.tags.splice(this.tags.indexOf(tag), 1);
				let lastTagPath = this.tags[this.tags.length - 1].path;
				if (this.$route.path == lastTagPath) {
					return;
				}
				this.$router.replace({ path: lastTagPath });
			},
			handleClick (tag) {
				if (this.$route.name == tag.name) {
					return;
				};
				this.initTags();
				this.$router.push({
					path: tag.path
				}).catch(err => {err})
			}
		},
		watch: {
			$route (to) {
				this.initTags();
			}
		}
	}
</script>
<style lang="less">
	.history-router {
		padding: 4px 20px; 
		align-items: center;
		border-bottom: 1px solid #d8dce5;
		-webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 0 3px 0 rgba(0,0,0,0.04);
		box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 0 3px 0 rgba(0,0,0,0.04);
	}
	.el-tag + .el-tag {
		margin-left: 10px;
	}
	.el-tag {
		cursor: hand;
		cursor: pointer;
		height: 26px;
		line-height: 26px;
		border-radius: 0;

		&.active {
			background: #42b983;
			color: #FFF;
			border-color: #42b983;

			&:before {
				content: '';
				background: #fff;
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				position: relative;
				margin-right: 2px;
			}

			.el-icon-close {
				color: #FFF;
			}
		}
	}
</style>