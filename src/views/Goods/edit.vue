<template>
	<div class="container">
		<el-page-header @back="goBack" :content="pageTitle"></el-page-header>

		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="基本信息" name="info">
				<div class="edit-form">
					<el-form label-position="left" label-width="100px" :rules="rules" :model="goodsForm">
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
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
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
									<el-input v-model="goodsForm.sales_sum" placeholder="请输入分类规格"></el-input>
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
									<QuillEditor v-model="goodsForm.content"/>
								</el-form-item>
							</el-col>

							<el-col :lg="12">
								<el-form-item>
									<el-button type="primary" @click="submitForm()">保存商品</el-button>
									<el-button @click="resetForm()">重置</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>		
			</el-tab-pane>

			<el-tab-pane label="商品图片" name="picture">
				<div class="edit-form">
					<el-upload
					  class="upload-demo"
					  ref="upload"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :file-list="fileList"
					  list-type="picture"
					  :auto-upload="false">
					  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</div>
			</el-tab-pane>

			<el-tab-pane label="商品规格" name="size">
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
								  @click="handleEdit(scope.$index, scope.row)"></el-button>
								<el-button
								  size="small"
								  type="danger"
								  icon="el-icon-delete"
								  @click="handleDelete(scope.$index, scope.row)"></el-button>
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
	import { MessageBox } from 'element-ui'
	import QuillEditor from '@/components/Editor/index'

	export default {
		data () {
			return {
				activeName: 'size',
				pageTitle: "",
				id: "",
				goodsData: "",
				goodsForm: {},
				fileList: [
					{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
				],
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
			}
		},
		components: {
			QuillEditor,
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

				goodsApi.getGoodsInfo(params)
					.then(res => {
						const { data } = res;
						const { title, description, class_id, price_member, price_market, size_name, item_name, stock, sales_sum, min_yunfei, shelves, recommend, post_fee, post_fee_spc} = res.data;
						this.goodsForm = { title, description, class_id, price_member, price_market, size_name, item_name, stock, sales_sum, min_yunfei, shelves, recommend, post_fee, post_fee_spc};
						this.goodsData = data;
						data.size_list.map(item => {
							item.isExist = true;
							this.sizeData.push(item);
						})
						data.pictures.map(item => {
							this.fileList.push({
								name: item.thumb,
								url: item.thumb
							})
						})
						// this.pageTitle = "ID：" + data.id + " - " + data.title;
					})
			},
			goBack () {
				this.$router.back(-1);
			},
			handleClick (tab, event) {		// tab切换
				// console.log(tab, event);
			},
			handlePreview (file) {
				console.log(file);
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
			handleRemove () {},
			submitUpload () {},
			submitForm () {
				console.log(this.goodsForm);
			},
			handleDelete (index, row) {
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
			handleEdit (index, row) {
				let params = row;
				params.p_id = this.goodsData.id;
				console.log(params);
				goodsApi.addGoods(params)
					.then(res => {
						console.log(res);
						const { data } = res;
						this.sizeData[index].isExist = true;
						this.sizeData[index].id = data;
					})
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
	.edit-form {
		padding: 20px;
	}
	.el-upload-list {
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
	}
	.el-upload-list__item {
		margin-right: 20px;
		width: 300px;
	}
</style>