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
					<el-table-column prop="date" label="日期" width="180">
						<template slot-scope="scope">
						<span>{{scope.row.date}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="180"></el-table-column>
					<el-table-column prop="address" label="地址"></el-table-column>
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
	export default {
		data () {
			return {
				tableData: [{
					id: 1,
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 2,
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 3,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 4,
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 5,
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 6,
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 7,
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
        		multipleSelection: [],
        		delArr: [],
			}
		},
		methods: {
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
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
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