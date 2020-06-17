<template>
	<div>
		<div class="examples">
			<h1 class="examples-title">表格示例</h1>

			<div class="table">
				<el-table 
					:data="tableData" 
					ref="multipleTable"
					:stripe="true" 
					tooltip-effect="dark" 
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" lable="ID" width="70"></el-table-column>
					<el-table-column prop="title" label="标题" width="200"></el-table-column>

					<el-table-column label="封面图">
						<template slot-scope="scope">
							<el-image
						      style="width: 200px; height: 100px"
						      :src="cover"
						      fit="cover"></el-image>
						</template>
					</el-table-column>

					<el-table-column label="创建时间">
						<template slot-scope="scope">{{timeInit(scope.row.create_time)}}</template>
					</el-table-column>

					<el-table-column label="排序" width="100">
						<template slot-scope="scope">
							<el-input type="number" v-model="scope.row.sort" @blur="handleSort(scope.row)" placeholder="排序"></el-input>
						</template>
					</el-table-column>

					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
							  size="small"
							  type="primary"
							  icon="el-icon-edit"
							  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button
							  size="small"
							  type="danger"
							  icon="el-icon-delete"
							  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
					background
					layout="prev, pager, next"
					:total="1000">
				</el-pagination>	
			</div>
		</div>
	</div>
</template>
<script>
	import goodsApi from '@/api/goods'

	export default {
		data () {
			return {
				tableData: [],
        		multipleSelection: [],
        		delArr: [],
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
				goodsApi.getBannerList(params)
					.then(res => {
						let { data } = res;
						this.totalPage = data.totalPage * 10;
						this.listData = data.data;
					})
			},

			toggleSelection(rows) {
				if (rows) {
				  	rows.forEach(row => {
				    	this.$refs.multipleTable.toggleRowSelection(row);
				  	});
				} else {
				  	this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
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
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.multipleSelection.map((item) => {
						this.tableData.map((subItem, index) => {
							if (item.id == subItem.id) {
								this.delArr.push(index);	
							}
						})
					})
 					this.delArr.sort((a, b) => { 
 						return b - a
 					});
                    this.delArr.forEach((index) => { 
                    	this.tableData.splice(index, 1) 
                    });
		        }).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
		        });
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			handleSort (rows) {
				console.log(rows);
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