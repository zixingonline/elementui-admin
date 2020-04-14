<template>
	<div>
		<div class="examples">
			<h1 class="examples-title">表格示例</h1>

			<el-table 
				:data="tableData" 
				ref="multipleTable"
				:stripe="true" 
				tooltip-effect="dark" 
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55"></el-table-column>
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
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				tableData: [{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
        		multipleSelection: []
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