<template>
	<div class="container">
		<el-page-header @back="goBack" content="新增商品"></el-page-header>

		<el-tabs v-model="activeName">
			<el-tab-pane label="基本信息" name="info">
				<div class="edit-form">
					<el-form label-position="left" label-width="100px" :rules="rules" ref="ruleForm" :model="goodsForm">
						<el-row>
							<el-col :lg="12">
								<el-form-item label="商品名称" prop="title">
									<el-input v-model="goodsForm.title" placeholder="请输入商品名称"></el-input>
								</el-form-item>

								<el-form-item label="商品简介">
									<el-input type="textarea" v-model="goodsForm.description" placeholder="请输入商品简介"></el-input>
								</el-form-item>

								<el-form-item label="商品类别" prop="class_id">
									<el-select v-model="goodsForm.class_id" placeholder="请选择商品类别" style="width:100%">
										<el-option :label="item.class_name" :value="item.id" v-for="(item, index) in classList" :key="index"></el-option>
									</el-select>
								</el-form-item>

								<el-form-item label="会员价" prop="price_member">
									<el-input v-model.number="goodsForm.price_member" placeholder="请输入商品会员价"></el-input>
								</el-form-item>

								<el-form-item label="市场价" prop="price_market">
									<el-input v-model.number="goodsForm.price_market" placeholder="请输入商品市场价"></el-input>
								</el-form-item>

								<el-form-item label="分类名称">
									<el-input v-model="goodsForm.size_name" placeholder="请输入分类名称"></el-input>
								</el-form-item>

								<el-form-item label="分类规格">
									<el-input v-model="goodsForm.item_name" placeholder="请输入分类规格"></el-input>
								</el-form-item>

								<el-form-item label="商品销量" prop="sales_sum">
									<el-input v-model="goodsForm.sales_sum" placeholder="请输入商品销量"></el-input>
								</el-form-item>

								<el-form-item label="商品库存" prop="stock">
									<el-input v-model="goodsForm.stock" placeholder="请输入商品库存"></el-input>
								</el-form-item>

								<el-form-item label="是否包邮" prop="min_yunfei">
									<el-radio-group v-model="goodsForm.min_yunfei">
										<el-radio :label="1">是</el-radio>
										<el-radio :label="0">否</el-radio>
									</el-radio-group>
								</el-form-item>

								<el-form-item label="省内运费" prop="post_fee">
									<el-input v-model.number="goodsForm.post_fee" placeholder="请输入商品省内运费"></el-input>
								</el-form-item>

								<el-form-item label="省外运费" prop="post_fee_spc">
									<el-input v-model.number="goodsForm.post_fee_spc" placeholder="请输入商品省外运费"></el-input>
								</el-form-item>

								<el-form-item label="是否上架" prop="min_yunfei">
									<el-radio-group v-model="goodsForm.shelves">
										<el-radio :label="1">是</el-radio>
										<el-radio :label="0">否</el-radio>
									</el-radio-group>
								</el-form-item>

								<el-form-item label="是否推荐" prop="min_yunfei">
									<el-radio-group v-model="goodsForm.recommend">
										<el-radio :label="1">是</el-radio>
										<el-radio :label="0">否</el-radio>
									</el-radio-group>
								</el-form-item>

							</el-col>

							<el-col :lg="20">
								<el-form-item label="商品详情">
									<QuillEditor @input="updateContent" :value="goodsForm.content" v-if="goodsForm.content" />
								</el-form-item>
							</el-col>

							<el-col :lg="12">
								<el-form-item>
									<el-button type="primary" @click="submitForm()">保存商品</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>		
			</el-tab-pane>

			<el-tab-pane label="商品图片" name="picture" :disabled="id ? false : true">
				<div class="edit-form">
					<el-upload
					  class="upload-demo"
					  ref="upload"
					  :action="uploadUrl"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :on-success="handleUploadSuccess"
					  :before-upload="handleBeforeUpload"
					  :before-remove="handleBeforeRemove"
					  :file-list="fileList"
					  :data="uploadData"
					  list-type="picture-card"
					  :auto-upload="false">
					  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					  <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
					</el-upload>
				</div>
			</el-tab-pane>

			<el-tab-pane label="商品规格" name="size" :disabled="id ? false : true">
				<div class="edit-form">
					<el-form label-position="left" label-width="100px">
						<el-row>
							<el-col :lg="12">
								<el-form-item label="分类名称" prop="title">
									<el-input v-model="sizeName" placeholder="请输入分类名称（如款式图案等）"></el-input>
								</el-form-item>

								<el-form-item label="分类规格" prop="title">
									<el-input v-model="itemName" placeholder="请输入分类规格（如容量码数等）"></el-input>
								</el-form-item>

								<el-form-item>
									<el-button type="primary" @click="createSize()">添加</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>

					<el-table 
						:data="sizeData" 
						ref="multipleTable"
						:stripe="true" 
						tooltip-effect="dark" 
					>
						<el-table-column label="分类名称">
							<template slot-scope="scope">
								<span v-if="!scope.row.isExist">{{sizeName}}</span>
								<span v-else>{{scope.row.size_name}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="item_name" label="分类规格">
							<template slot-scope="scope">
								<span v-if="!scope.row.isExist">{{itemName}}</span>
								<span v-else>{{scope.row.item_name}}</span>
							</template>
						</el-table-column>
						<el-table-column label="会员价">
							<template slot-scope="scope">
								<el-input v-model="scope.row.price_member" placeholder="会员价" v-if="!scope.row.isExist"></el-input>
								<span v-else>{{scope.row.price_member}}</span>
							</template>
						</el-table-column>
						<el-table-column label="市场价">
							<template slot-scope="scope">
								<el-input v-model="scope.row.price_market" placeholder="市场价" v-if="!scope.row.isExist"></el-input>
								<span v-else>{{scope.row.price_market}}</span>
							</template>
						</el-table-column>
						<el-table-column label="库存" width="120">
							<template slot-scope="scope">
								<el-input v-model="scope.row.stock" placeholder="库存" v-if="!scope.row.isExist"></el-input>
								<span v-else>{{scope.row.stock}}</span>
							</template>
						</el-table-column>
						<el-table-column label="省内运费" width="120">
							<template slot-scope="scope">
								<el-input v-model="scope.row.post_fee" placeholder="省内运费" v-if="!scope.row.isExist"></el-input>
								<span v-else>{{scope.row.post_fee}}</span>
							</template>
						</el-table-column>
						<el-table-column label="省外运费" width="120">
							<template slot-scope="scope">
								<el-input v-model="scope.row.post_fee_spc" placeholder="省外运费" v-if="!scope.row.isExist"></el-input>
								<span v-else>{{scope.row.post_fee_spc}}</span>
							</template>
						</el-table-column>
						<el-table-column label="是否上架" width="120">
							<template slot-scope="scope">
								<el-switch
								  :disabled="scope.row.isExist"
								  v-model="scope.row.shelves ? true : false"
								  active-color="#13ce66"
								  inactive-color="#cccccc">
								</el-switch>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button
								  v-if="!scope.row.isExist"
								  size="small"
								  type="primary"
								  icon="el-icon-check"
								  @click="handleEditSize(scope.$index, scope.row)"></el-button>
								<el-button
								  size="small"
								  type="danger"
								  icon="el-icon-delete"
								  @click="handleDeleteSize(scope.$index, scope.row)"></el-button>
							</template>
					    </el-table-column>
					</el-table>
				</div>	
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import goodsApi from '@/api/goods'
	import QuillEditor from '@/components/Editor/index'
	import axios from 'axios'

	export default {
		data () {
			return {
				activeName: 'info',
				pageTitle: "",
				id: "",
				classList: [],
				goodsData: "",
				goodsForm: {
					recommend: 0,
					min_yunfei: 0,
					shelves: 1,
				},
				fileList: [],
				rules: {
					title: [
						{ required: true, message: '请输入商品名称', trigger: 'blur' }
					],
					class_id: [
						{ required: true, message: '商品类别不能为空', trigger: 'blur' }
					],
					price_member: [
						{required: true, message: '请输入正确的会员价', trigger: 'change' }
					],
					price_market: [
						{required: true, message: '请输入正确的市场价', trigger: 'change' }
					],
					sales_sum: [
						{ type: 'number', message: '请输入正确的商品销量', trigger: 'change' }
					],
					stock: [
						{ type: 'number', message: '请输入正确的商品库存', trigger: 'change' }
					],
					post_fee: [
						{ type: 'number', message: '请输入正确的运费', trigger: 'change' }
					],
					post_fee_spc: [
						{ type: 'number', message: '请输入正确的运费', trigger: 'change' }
					],
				},
				sizeName: "",
				itemName: "",
				sizeData: [],
				uploadUrl: '/api/goods/uploadPict',
				uploadData: {
					token: this.$store.state.user.token,
					goods_id: this.id
				}
			}
		},
		components: {
			QuillEditor,
		},
		created () {
			this.getClassList();
		},
		mounted () {
			const _t = this;
			window.onbeforeunload = function (e) {
				if(_t.id){
					e = e || window.event;
					if (e) {
						e.returnValue = '关闭提示';
					}
					return '关闭提示';
				} else {
					window.onbeforeunload =null
				}
			}
		},
		methods: {
			getClassList () {
				goodsApi.getClassList()
					.then(res => {
						this.classList = res.data;
					})
			},

			goBack () {
				this.$router.back(-1);
			},

			handlePreview (files) {
				console.log(files);
			},

			handleRemove (files, fileList) {
				console.log(files);
				console.log(fileList);
				if (files.status == 'success') {
					const params = {
						id: files.id
					}
					goodsApi.deleteGoodsPict(params)
						.then(res => {
							console.log(res);
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
						})
				}
			},

			handleBeforeRemove (files) {
				return this.$confirm('确认删除该图片?');
			},

			handleBeforeUpload (files) {
				if (files.size >= 1024*1024) {
					this.$message({
						type: 'error',
						message: files.name + '文件大小超过1M！'
					});
					return false;
				}
			},

			handleUploadSuccess (resp, file, fileList) {
				console.log(resp);
				console.log(file);
				file.id = file.response.data;
				console.log(fileList);
			},

			submitUpload () {
				this.$refs.upload.submit();
			},

			createSize () {
				if (!this.sizeName) {
					this.$message({
	                    message: '分类名称不能为空！',
	                    type: 'error',
	                    duration: 1000
					})
					return;
				}

				console.log(this.sizeName, this.itemName);
				this.sizeData.push({
					size_name: this.sizeName,
					item_name: this.itemName,
					price_member: "",
					price_market: "",
					stock: "",
					post_fee: "",
					post_fee_spc: "",
					shelves: 1,
					isExist: false,
				})
			},

			submitForm () {
				this.$refs['ruleForm'].validate((valid) => {
					if (valid) {
						let params = this.goodsForm;
						goodsApi.addGoods(params)
							.then(res => {
								console.log(res);
								this.id = res.data;
								this.$message({
									type: 'success',
									message: '添加成功!'
								});
							})
					} else {
						this.$message({
							type: 'error',
							message: '请正确填写商品数据!'
						});
						return false;
					}
				});
			},

			handleDeleteSize (index, row) {
				if (!row.isExist) {
					this.sizeData.splice(index, 1);
				} else {
					this.$confirm('确认删除该子商品?', '警告', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						const params = {
							id: row.id
						}
						goodsApi.deleteGoods(params)
							.then(res => {
								console.log(res);
								this.$message({
									type: 'success',
									message: '删除成功!'
								});

								this.sizeData.splice(index, 1);
							})
					}).catch(() => {});
				}
			},

			handleEditSize (index, row) {
				let params = row;
				params.p_id = this.id;
				console.log(params);
				goodsApi.addGoods(params)
					.then(res => {
						console.log(res);
						const { data } = res;
						this.sizeData[index].isExist = true;
						this.sizeData[index].id = data;
					})
			}
		},

		beforeRouteLeave (to, from, next) {
			if (!this.id) {
				next();
			} else {
				this.$confirm('当前页面数据未保存，确定离开?', '警告', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					next();
				}).catch(() => {
					next(false);
				});	
			}
		},

		destroyed() {
  			window.onbeforeunload = null
 		},
	}
</script>
<style>
	.el-page-header {
		padding-bottom: 20px;
		margin-bottom: 20px;
		border-bottom: 1px solid #eee;
	}
	.edit-form {
		padding: 20px;
	}
</style>