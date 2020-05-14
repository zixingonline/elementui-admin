<template>
	<div>
		<div class="page">
			<div class="toolbar flex-between">
				<h1 class="toolbar-title">MEMBER <span class="sm">（共 {{totalCount}}）</span></h1>
			</div>

			<div class="table">
				<el-table 
					:data="listData" 
					:stripe="true" 
					tooltip-effect="dark" 
				>
					<el-table-column prop="id" label="ID" width="70"></el-table-column>
					<el-table-column prop="open_id" label="openId" min-width="200"></el-table-column>
					<el-table-column prop="nickname" label="昵称"></el-table-column>
					<el-table-column prop="phone" label="手机号"></el-table-column>
					<el-table-column label="创建时间">
						<template slot-scope="scope">{{timeInit(scope.row.create_time)}}</template>
					</el-table-column>
					<el-table-column label="操作" min-width="65">
						<template slot-scope="scope">
							<el-button
							  size="small"
							  type="primary"
							  icon="el-icon-location"
							  @click="handleView(scope.$index, scope.row)"></el-button>
						</template>
				    </el-table-column>
				</el-table>
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

		<el-dialog title="地址列表" :visible.sync="dialogTableVisible">
			<el-table :data="addressData">
				<el-table-column property="id" label="ID" width="60"></el-table-column>
				<el-table-column property="receiver" label="收货人"></el-table-column>
				<el-table-column property="phone" label="手机号"></el-table-column>
				<el-table-column label="收货地址">
					<template slot-scope="scope">
						{{scope.row.prov}} {{scope.row.city}} {{scope.row.dist}} {{scope.row.address}}
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script>
	import utils from '@js/utils'
	import memberApi from '@/api/member'

	export default {
		data () {
			return {
				listData: [],
				totalPage: 0,
				totalCount: "",
        		page: 1,
        		dialogTableVisible: false,
        		addressData: [],
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
				memberApi.getList(params)
					.then(res => {
						let { data } = res;
						this.totalCount = data.totalCount;
						this.totalPage = data.totalPage * 10;
						this.listData = data.data;
					})
			},

			handleView (index, row) {
				this.dialogTableVisible = true;
				this.addressData = row.address;
			},

			changePage (page) {
				this.page = page;
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