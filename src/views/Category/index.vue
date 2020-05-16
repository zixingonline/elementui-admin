<template>
	<div>
		<div class="page">
			<div class="toolbar flex-between">
				<h1 class="toolbar-title">GOODS <span class="sm">（共 100）</span></h1>

				<div class="toolbar-main">
					<el-button type="primary" @click="handleAdd()">添加<i class="el-icon-plus el-icon--right"></i></el-button>
				</div>
			</div>

			<div class="table">
				<el-table 
					:data="listData" 
					ref="multipleTable"
					:stripe="true" 
					tooltip-effect="dark" 
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="ID" width="70"></el-table-column>
					<el-table-column prop="class_name" label="分类名称"></el-table-column>
					<el-table-column label="创建时间">
						<template slot-scope="scope">{{timeInit(scope.row.create_time)}}</template>
					</el-table-column>
					<el-table-column label="更新时间">
						<template slot-scope="scope">{{timeInit(scope.row.update_time)}}</template>
					</el-table-column>
					<el-table-column label="排序" width="100">
						<template slot-scope="scope">
							<el-input type="number" v-model="scope.row.sort" @blur="handleSort(scope.row)" placeholder="排序"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="130">
						<template slot-scope="scope">
							<el-button
							  size="small"
							  type="primary"
							  icon="el-icon-edit"
							  @click="handleEdit(scope.$index, scope.row)"></el-button>

							<el-button
							  size="small"
							  type="danger"
							  icon="el-icon-delete"
							  @click="handleDelete(scope.$index, scope.row)"></el-button>
						</template>
				    </el-table-column>
				</el-table>

				<div class="table-opts">
					<el-button type="danger" size="small" @click="handleSelectDelete()">删除</el-button>
					<el-button type="default" size="small" @click="toggleSelection()">取消选择</el-button>
				</div>
			</div>

			<div class="pagination flex-center">
				<el-pagination
					@current-change="changePage"
					background
					layout="prev, pager, next"
					:total="totalPage">
				</el-pagination>	
			</div>
		</div>

		<el-dialog :title="categoryName" :visible.sync="dialogTableVisible">
			<el-form ref="form" :rules="rules" :model="currentCategory" label-width="80px">
				<el-form-item label="分类名称" prop="class_name">
				    <el-input v-model="currentCategory.class_name" placeholder="请输入分类名称"></el-input>
				</el-form-item>

				<el-upload
				  class="avatar-uploader"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :show-file-list="false"
				  :action="uploadUrl"
				  :data="uploadData"
				  :on-success="handleUploadSuccess"
				  :before-upload="handleBeforeUpload">
				  <img v-if="cateIconUrl" :src="cateIconUrl">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				  <div class="el-upload__tip" slot="tip">分类图标只能上传jpg/png文件，且不超过1M</div>
				</el-upload>

				<el-form-item>
					<el-button type="primary" @click="submitForm()">保存商品</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import utils from '@js/utils'
	import goodsApi from '@/api/goods'

	export default {
		data () {
			return {
				listData: [],
				totalPage: 0,
        		multipleSelection: [],
        		delArr: [],
        		page: 1,
        		dialogTableVisible: false,
        		categoryName: "",
        		currentCategory: {
        			id: "",
        			class_name: "",
        			icon: ""
        		},
        		uploadUrl: "/api/category/uploadIcon",
        		uploadData: {
					token: this.$store.state.user.token,
				},
        		cateIconUrl: "",
        		rules: {
					class_name: [
						{ required: true, message: '请输入分类名称', trigger: 'blur' }
					],
				},
			}
		},
		created () {
			this.getData();
		},
		computed: {
			timeInit () {
				return (timestamp) => {
					if (timestamp) {
						return utils.timeInit(timestamp);
					}
					return '-';
				}
			},
		},
		methods: {
			getData () {
				let params = {
					page: this.page,
				}
				goodsApi.getCategoryList(params)
					.then(res => {
						let { data } = res;
						this.totalPage = data.totalPage * 10;
						this.listData = data.data;
					})
			},

			toggleSelection (rows) {
				if (rows) {
				  	rows.forEach(row => {
				    	this.$refs.multipleTable.toggleRowSelection(row);
				  	});
				} else {
				  	this.$refs.multipleTable.clearSelection();
				}
			},

			handleSelectionChange (val) {
				this.multipleSelection = val;
			},

			handleDelete (index, row) {
				console.log(index, row);
				this.$confirm('确认删除该分类?', '警告', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const params = {
						id: row.id
					}
					goodsApi.deleteCategory(params)
						.then(res => {
							console.log(res);
							this.$message({
								type: 'success',
								message: '删除成功!'
							});

							this.getData();	
						})
				}).catch(() => {});
			},

			handleSelectDelete () {
				if (!this.multipleSelection.length) {
					this.$message.error('请先选择删除项！');
					return;
				}

			 	this.$confirm('确定删除选中项?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true,
					showClose: false,
		        }).then(() => {
					let idsArr = [];
					this.multipleSelection.map((item) => {
						idsArr.push(item.id);
						this.listData.map((subItem, index) => {
							if (item.id == subItem.id) {
								this.delArr.push(index);	
							}
						})
					})

					let params = {
						ids: idsArr.join(",")
					}
					goodsApi.deleteCategoryList(params)
						.then(res => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});

							this.getData();	
						})
		        }).catch(() => {});
			},
			
			handleEdit (index, row) {
				this.categoryName = row.class_name;
				this.dialogTableVisible = true;
				this.currentCategory = row;
				this.cateIconUrl = row.icon_url;
				this.type = 'edit';
			},

			handleAdd () {
				this.categoryName = '添加分类';
				this.dialogTableVisible = true;
				this.currentCategory = {
					class_name: "",
        			icon: "",
        			id: "",
				}
				this.cateIconUrl = "";
				this.type = 'add';
			},

			submitForm () {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						let params = this.currentCategory;
						if (this.type == 'edit') {
							goodsApi.editCategory(params)
								.then(res => {
									this.$message({
										type: 'success',
										message: '修改成功!'
									});
									this.getData();
								})
						} else {
							goodsApi.addCategory(params)
								.then(res => {
									this.currentCategory.id = res.data;
									this.type = 'edit';
									this.$message({
										type: 'success',
										message: '添加成功!'
									});
									this.getData();
								})
						}
					} else {
						this.$message({
							type: 'error',
							message: '请正确填写分类数据!'
						});
						return false;
					}
				});
			},

			changePage (page) {
				this.page = page;
				this.getData();
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
				this.cateIconUrl = resp.data.pic_url;
				this.currentCategory.icon = resp.data.url;
			},

			handleSort (row) {
				let params = row;
				goodsApi.editCategory(params)
					.then(res => {
						this.$message({
							type: 'success',
							message: '修改成功!'
						});
						this.getData();
					})
			}
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
	
	.avatar-uploader {
		margin: 0 0 0 80px;
		height: 144px;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 100px;
		height: 100px;
	}
	.el-upload img {
		display: block;
		height: 100%;
		width: 100%;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
</style>