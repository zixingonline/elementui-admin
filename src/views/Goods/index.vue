<template>
	<div>
		<div class="page">
			<div class="toolbar">
				<el-row>
					<el-col :span="8">
						<h1 class="toolbar-title">GOODS <span class="sm">（共 {{totalCount}}）</span></h1>
					</el-col>

					<el-col :span="16">
						<div class="toolbar-main flex">
							<div class="toolbar-select">
								<el-select v-model="classId" placeholder="请选择分类" size="small" @change="selectCategory()">
									<el-option :label="item.class_name" :value="item.id" v-for="item in cateList"></el-option>
								</el-select>
							</div>

							<div class="toolbar-search flex">
								<el-input v-model="keyword" size="small" placeholder="请输入关键词"></el-input>
								<el-button type="primary" size="small" @click="searchKey()">
									<i class="el-icon-search"></i>
								</el-button>
							</div>
							
							<el-button type="primary" @click="$router.push({path: '/goods-add'})" size="small">添加<i class="el-icon-plus el-icon--right"></i></el-button>
						</div>		
					</el-col>
				</el-row>
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
					<el-table-column prop="title" label="商品名" width="240"></el-table-column>
					<el-table-column prop="price_member" label="会员价"></el-table-column>
					<el-table-column prop="price_market" label="市场价"></el-table-column>
					<el-table-column prop="class_name" label="分类"></el-table-column>
					<el-table-column label="子商品">
						<template slot-scope="scope">
							<el-button
							  size="small"
							  type="success"
							  icon="el-icon-view"
							  @click="handleView(scope.$index, scope.row)">{{scope.row.goods_child}}</el-button>
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
					:current-page="page"
					background
					layout="prev, pager, next"
					ref="pagination"
					:total="totalPage">
				</el-pagination>	
			</div>
		</div>

		<el-dialog :title="goodsName" :visible.sync="dialogTableVisible">
			<el-table :data="subGoodsData">
				<el-table-column property="id" label="ID" width="60"></el-table-column>
				<el-table-column property="title" label="商品名" width="180"></el-table-column>
				<el-table-column property="price_member" label="会员价"></el-table-column>
				<el-table-column property="price_market" label="市场价"></el-table-column>
				<el-table-column label="分类/规格">
					<template slot-scope="scope">
						{{scope.row.size_name}} / {{scope.row.item_name}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="60">
					<template slot-scope="scope">
						<el-tooltip content="删除" placement="top">
							<el-button
							  size="small"
							  type="danger"
							  icon="el-icon-delete"
							  @click="handleDelete(scope.$index, scope.row)"></el-button>
						</el-tooltip>
					</template>
			    </el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script>
	import goodsApi from '@/api/goods'

	export default {
		data () {
			return {
				listData: [],
				totalPage: 0,
				totalCount: 0,
        		multipleSelection: [],
        		delArr: [],
        		page: 1,
        		dialogTableVisible: false,
        		subGoodsData: [],
        		subGoodsPage: 0,
        		goodsName: "",
        		keyword: "",
        		cateList: [],
        		classId: "",
			}
		},
		created () {
			this.getData();
		},
		methods: {
			getData () {
				let params = {
					cid: this.classId,
					page: this.page,
					keyword: this.keyword,
				}
				goodsApi.getGoodsList(params)
					.then(res => {
						let { data } = res;
						this.totalPage = data.totalPage * 10;
						this.totalCount = data.totalCount;
						this.listData = data.data;
						if (!this.cateList.length) {
							this.cateList = data.cateList;
						}
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
				this.$router.push({path: '/goods-edit/' + row.id});
			},

			handleDelete (index, row) {
				console.log(index, row);
				this.$confirm('确认删除该商品以及子商品?', '警告', {
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

							if (!this.dialogTableVisible) {
								this.getData();
							} else {
								this.subGoodsData.splice(index, 1);
							}
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
					goodsApi.deleteList(params)
						.then(res => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});

							this.getData();

							// this.delArr.sort((a, b) => { 
							// 		return b - a
							// 	});
							// this.delArr.forEach((index) => { 
							// 	this.listData.splice(index, 1) 
							// });		
						})
		        }).catch(() => {});
			},
			
			handleView (index, row) {
				this.goodsName = row.title;
				
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
			},

			searchKey () {
				this.classId = "";
				this.page = 1;
				this.getData();
			},

			selectCategory () {
				this.keyword = "";
				this.page = 1;
				this.getData();
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
</style>