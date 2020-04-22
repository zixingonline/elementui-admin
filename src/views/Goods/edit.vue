<template>
	<div class="container">
		<el-page-header @back="goBack" :content="pageTitle"></el-page-header>

		<div class="edit-form">
			<el-row>
				<el-col :lg="12">
					<el-form label-width="100px" :model="goodsForm">
						<el-form-item label="名称">
							<el-input v-model="goodsForm.title"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			
			<el-row>
				<el-col :lg="12">
					<el-form label-width="100px" :model="goodsForm">
						<el-form-item label="名称">
							<el-input v-model="goodsForm.title"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import { getGoodsInfo, editGoods } from '@/api/goods'
	import { MessageBox } from 'element-ui'

	export default {
		data () {
			return {
				pageTitle: "",
				id: "",
				goodsData: "",
				goodsForm: {

				}
			}
		},
		created () {
			this.id = this.$route.params.id;
			this.getData();
		},
		methods: {
			getData () {
				const params = {
					id: this.id
				}

				getGoodsInfo(params)
					.then(res => {
						console.log(res);
						const { data } = res;
						this.goodsData = data;
						// this.pageTitle = data.title;
					})
			},
			goBack () {
				this.$router.back(-1);
			}
		}
	}
</script>
<style>
	.el-page-header {
		padding-bottom: 20px;
		margin-bottom: 20px;
		border-bottom: 1px solid #eee;
	}
</style>