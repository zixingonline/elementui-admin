<template>
	<div>
		<div class="page">
			<div class="toolbar flex-between">
				<h1 class="toolbar-title">GOODS <span class="sm">（共 100）</span></h1>

				<div class="toolbar-main">
					<el-button type="primary" @click="$router.push({path: '/goods-add'})">添加<i class="el-icon-plus el-icon--right"></i></el-button>
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
							<el-input type="number" v-model="scope.row.sort" placeholder="排序"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="130">
						<template slot-scope="scope">
							<el-button
							  size="small"
							  type="primary"
							  icon="el-icon-edit"
							  @click="handleView(scope.$index, scope.row)"></el-button>

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
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="分类名称">
				    <el-input v-model="form.class_name" placeholder="请输入分类名称"></el-input>
				</el-form-item>
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
        		form: {
        			class_name: ""
        		}
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

			handleEdit (index, row) {
				console.log(index, row);
				this.$router.push({path: '/goods-edit/' + row.id});
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

							this.listData.splice(index, 1);
						})
				}).catch(() => {});
			},

			handleSelectDelete () {
				console.log(this.multipleSelection.length);
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

							this.delArr.sort((a, b) => { 
		 						return b - a
		 					});
		                    this.delArr.forEach((index) => { 
		                    	this.listData.splice(index, 1) 
		                    });		
						})
		        }).catch(() => {});
			},
			
			handleView (index, row) {
				this.goodsName = row.class_name;
				
				let params = {
					p_id: row.id,
				}
				goodsApi.getGoodsList(params)
					.then(res => {
						let { data } = res;
						this.dialogTableVisible = true;
						this.subGoodsData = data.data;
						this.subGoodsPage = data.totalPage;
					})
			},

			changePage (page) {
				this.page = page;
				this.getData();
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
</style>