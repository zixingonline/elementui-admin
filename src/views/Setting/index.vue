<template>
	<div>
		<div class="page">
			<div class="toolbar flex-between">
				<h1 class="toolbar-title">SETTING</h1>
			</div>

			<div class="edit-form">
				<el-form label-position="left" label-width="100px" :rules="rules" ref="ruleForm" :model="config">
					<el-row>
						<el-col :lg="12">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span>推荐配置</span>
								</div>
								<div class="text item">
									<el-form-item label="推荐标题" prop="recommend_title">
										<el-input v-model="config.recommend_title" placeholder="请输入推荐标题"></el-input>
									</el-form-item>

									<el-form-item label="价格标签" prop="recommend_tag">
										<el-input v-model="config.recommend_tag" placeholder="请输入价格标签（选填）"></el-input>
									</el-form-item>
								</div>
							</el-card>

							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span>客服配置</span>
								</div>
								<div class="text item">
									<el-form-item label="联系人" prop="username">
										<el-input v-model="config.username" placeholder="请输入联系人姓名"></el-input>
									</el-form-item>

									<el-form-item label="手机号" prop="phone">
										<el-input v-model="config.phone" placeholder="请输入手机号码"></el-input>
									</el-form-item>

									<el-form-item label="微信号" prop="wechat">
										<el-input v-model="config.wechat" placeholder="请输入微信号"></el-input>
									</el-form-item>
								</div>
							</el-card>

							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span>其他配置</span>
								</div>
								<div class="text item">
									<el-form-item label="起送价" prop="delivery_price">
										<el-input v-model="config.delivery_price" placeholder="请输入起送价格"></el-input>
									</el-form-item>

									<el-form-item label="广播内容" prop="broadcast">
										<el-input type="textarea" v-model="config.broadcast" placeholder="请输入商品简介"></el-input>
									</el-form-item>
								</div>
							</el-card>
						</el-col>
						

						<el-col :lg="12">
							<el-form-item>
								<el-button type="primary" @click="submitForm()">保存配置</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>	
		</div>
	</div>
</template>
<script>
	import utils from '@js/utils'
	import userApi from '@/api/user'

	export default {
		data () {
			return {
				config: {},
				rules: {
					recommend_title: [
						{ required: true, message: '请输入推荐标题', trigger: 'blur' }
					],
					username: [
						{ required: true, message: '请输入联系人姓名', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' }
					],
					wechat: [
						{required: true, message: '请输入微信号', trigger: 'change' }
					],
					delivery_price: [
						{required: true, message: '请输入起送价', trigger: 'change' }
					],
					broadcast: [
						{required: true, message: '请输入广播内容', trigger: 'change' }
					],
				},
			}
		},
		created () {
			this.getData();
		},
		methods: {
			getData () {
				let params = {
					page: this.page,
				}
				userApi.getConfig(params)
					.then(res => {
						let { data } = res;
						this.config = data;
					})
			},

			submitForm () {
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						let params = this.config;
						userApi.updateConfig(params)
							.then(res => {
								this.$message({
									type: 'success',
									message: '修改成功!'
								});
							})
					} else {
						this.$message({
							type: 'error',
							message: '请正确填写数据!'
						});
						return false;
					}
				});
			},
		},
	}
</script>
<style>
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

	.box-card {
		margin-bottom: 20px;
	}

	.el-card__header {
		color: #FFF;
		background: #1ab394;
	}
</style>