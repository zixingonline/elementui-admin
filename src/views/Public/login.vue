<template>
	<div class="login flex-center">
		<div class="login-form">
			<el-form :model="form" ref="ruleForm" :rules="rules">
				<el-form-item prop="username">
					<el-input v-model="form.username" maxlength="32" placeholder="Username"></el-input>
				</el-form-item>

				<el-form-item prop="password">
					<el-input v-model="form.password" :type="passwordType" maxlength="16" placeholder="Password" suffix-icon="el-icon-view"></el-input>
					<span class="show-pwd" @click="showPwd()"></span>
				</el-form-item>

				<el-form-item>
					<el-button :loading="loading" type="primary" @click="onSubmit()" class="btn-login">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import utils from '@js/utils'
	import { loginRule } from '@js/validRules'
	
	export default {
		data () {
			return {
				form: {
					username: '',
					password: '',
				},
				rules: loginRule,
				passwordType: 'password',
				loading: false,
			}
		},

		methods: {
			onSubmit(ruleForm) {
				if (this.loading) {
					return;
				}

				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						this.loading = true;
		        		setTimeout(() => {
		        			this.loading = false;
		        			utils.setStorage('token', 'aaaabbb');

		    				let path;
		    				if (this.$route.query.redirect) {
		    					path = this.$route.query.redirect;
		    				} else {
		    					path = "/";
		    				}

							this.$router.replace({path: path});
		        		}, 2000)
					} else {
						return false;
					}
				});
	      	},

	      	showPwd () {
	      		this.passwordType = this.passwordType == 'password' ? 'text' : 'password';
	      	},
		}
	}
</script>
<style>
	.login {
		height: 100%;
		width: 100%;
		background: #2d3a4b;
	}
	.login-form {
		padding: 0 35px;
		width: 400px;
		max-width: 100%;
	}
	.btn-login {
		width: 100%;
	}
	.login-form .el-input__inner {
		color: #FFF;
		background: rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255,255,255,0.1);
	}
	.login-form .el-form-item {
		margin-bottom: 28px;
	}
	.show-pwd {
		position: absolute;
		top: 0;
		right: 5px;
		z-index: 2;
		width: 25px;
		height: 100%;
		cursor: hand;
		cursor: pointer;
	}
</style>