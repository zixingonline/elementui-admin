<template>
	<div>
		<div class="page">
			<div class="toolbar">
				<el-row>
					<el-col :span="8">
						<h1 class="toolbar-title">ORDER <span class="sm">（共 {{totalCount}}）</span></h1>
					</el-col>

					<el-col :span="16">
						<div class="toolbar-main flex">
							<div class="toolbar-select">
								<el-select v-model="order_status" placeholder="请选择订单状态" size="small" @change="selectType()">
									<el-option label="全部" value=""></el-option>
									<el-option label="已支付" :value="1"></el-option>
									<el-option label="未支付" :value="0"></el-option>
									<el-option label="取消订单" :value="-1"></el-option>
								</el-select>
							</div>

							<div class="toolbar-search flex">
								<el-input v-model="order_sn" size="small" placeholder="订单号查询"></el-input>
								<el-button type="primary" size="small" @click="searchKey()">
									<i class="el-icon-search"></i>
								</el-button>
							</div>
							
							<el-button type="primary" @click="exportList()" size="small">导出<i class="el-icon-plus el-icon--right"></i></el-button>
						</div>		
					</el-col>
				</el-row>
			</div>

			<!-- <div class="table">
				<el-table 
					:data="listData" 
					:stripe="true" 
					tooltip-effect="dark" 
				>
					<el-table-column prop="id" label="ID" width="70"></el-table-column>
					<el-table-column prop="order_sn" label="订单号" min-width="200"></el-table-column>
					<el-table-column prop="price_num" label="金额"></el-table-column>
					<el-table-column prop="address.receiver" label="收货人"></el-table-column>
					<el-table-column prop="order_type" label="收货方式">
						<template slot-scope="scope">
							{{scope.row.order_type == 1 ? '外送' : '自提'}}
						</template>
					</el-table-column>
					<el-table-column prop="order_status" label="支付状态">
						<template slot-scope="scope">
							<span :class="orderStatusClass(scope.row.order_status)">{{orderStatus(scope.row.order_status)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="pay_type" label="支付方式">
						<template slot-scope="scope">{{payType(scope.row.pay_type)}}</template>
					</el-table-column>
					<el-table-column label="创建时间">
						<template slot-scope="scope">{{timeInit(scope.row.create_time)}}</template>
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
			</div> -->

			<div class="pagination flex-center">
				<el-pagination
					@current-change="changePage"
					background
					layout="prev, pager, next"
					:total="totalPage">
				</el-pagination>	
			</div>
		</div>
	</div>
</template>
<script>
	import utils from '@js/utils'
	import orderApi from '@/api/order'

	export default {
		data () {
			return {
				listData: [],
				totalPage: 0,
				totalCount: "",
        		page: 1,
        		dialogTableVisible: false,
        		order_status: "",
        		order_sn: "",
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
					order_status: this.order_status,
					order_sn: this.order_sn,
				}
				orderApi.getList(params)
					.then(res => {
						let { data } = res;
						this.totalCount = data.totalCount;
						this.totalPage = data.totalPage * 10;
						this.listData = data.data;
					})
			},

			handleView (index, row) {
				this.$router.push({path: '/order-detail/' + row.id});
			},

			handleDelete (index, row) {
				console.log(index, row);
				this.$confirm('确认删除该订单，删除后不可恢复?', '警告', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const params = {
						id: row.id
					}
					orderApi.deleteOrder(params)
						.then(res => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});

							this.listData.splice(index, 1);
						})
				}).catch(() => {});
			},

			changePage (page) {
				this.page = page;
				this.getData();
			},

			orderStatus (status) {
				return utils.orderStatus(status);
			},

			orderStatusClass (status) {
				return utils.orderStatusClass(status);
			},

			payType (type) {
				return utils.payType(type);
			},

			searchKey () {
				this.order_status = "";
				this.page = 1;
				this.getData();
			},

			selectType () {
				this.keyword = "";
				this.page = 1;
				this.getData();
			},

			exportList () {
				// window.open('')
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