<template>
	<div class="history-router">
		<el-tag
		  v-for="(tag, index) in tags"
		  :key="index"
		  closable
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
			this.tags = this.$store.state.setting.historyRoute;
		},
		methods: {
			handleClose (tag) {
				this.tags.splice(this.tags.indexOf(tag), 1);
			},
			handleClick (tag) {
				if (this.$route.name == tag.name) {
					return;
				};
				this.$router.push({
					path: tag.path
				}).catch(err => {err})
			}
		}
	}
</script>
<style>
	.history-router {
		padding: 10px 20px 0; 
	}
	.el-tag + .el-tag {
		margin-left: 10px;
	}
	.el-tag {
		cursor: hand;
		cursor: pointer;
	}
</style>