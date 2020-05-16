<template>
	<div>
		<div class="page">
			<div class="order-section">
				<h1 class="examples-title">BASE INFO</h1>
				
				<div class="table">
					<el-table 
						:data="order" 
						border
						tooltip-effect="dark" 
					>
						<el-table-column prop="id" label="ID" width="70"></el-table-column>
						<el-table-column prop="order_sn" label="订单号" min-width="200"></el-table-column>
						<el-table-column prop="price_num" label="金额"></el-table-column>
						<el-table-column prop="address.receiver" label="收货人"></el-table-column>
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
					</el-table>
				</div>
			</div>

			<div class="order-section">
				<h1 class="examples-title">EXPRESS INFO</h1>
				
				<div class="table">
					<el-table 
						:data="order" 
						border
						tooltip-effect="dark" 
					>
						<template v-if=""></template>
						<el-table-column prop="address.receiver" label="收货人"></el-table-column>
						<el-table-column prop="address.phone" label="手机号"></el-table-column>
						<el-table-column label="地址">
							<template slot-scope="scope">
								{{scope.row.address.prov + scope.row.address.city + scope.row.address.dist + scope.row.address.address}}
							</template>
						</el-table-column>
						<el-table-column prop="address.zipcode" label="邮编"></el-table-column>
						<el-table-column label="配送方式">外送</el-table-column>
						<el-table-column prop="express_info.express_company ? express_info.express_company : '-'" label="配送公司"></el-table-column>
						<el-table-column prop="express_info.post_sn" label="快递单号"></el-table-column>
						<el-table-column label="发货时间">
							<template slot-scope="scope">{{timeInit(scope.row.send_time)}}</template>
						</el-table-column>
					</el-table>
				</div>
			</div>

			<div class="order-section">
				<h1 class="examples-title">GOODS INFO</h1>
				
				<div class="table">
					<el-table 
						:data="goodsList" 
						border
						tooltip-effect="dark" 
					>
						<el-table-column label="商品">
							<template slot-scope="scope">
									<p>
										<span class="">{{scope.row.title}}</span>
									</p>
							</template>
						</el-table-column>
						<el-table-column prop="goods_num" label="数量"></el-table-column>
						<el-table-column prop="goods_price" label="单价"></el-table-column>
						<el-table-column prop="goods_price" label="单价"></el-table-column>
					</el-table>
				</div>
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
							<el-tooltip content="查看" placement="top">
								<el-button
								  size="small"
								  type="primary"
								  icon="el-icon-edit"
								  @click="handleView(scope.$index, scope.row)"></el-button>
							</el-tooltip>

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
			</div> -->
		</div>
	</div>
</template>
<script>
	import utils from '@js/utils'
	import orderApi from '@/api/order'

	export default {
		data () {
			return {
				id: this.$route.params.id,
				order: [],
				goodsList: [],
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
					id: this.id,
				}
				orderApi.getOrderInfo(params)
					.then(res => {
						let { data } = res;
						console.log(data);
						this.order.push(data);
						this.goodsList = data.goods_list;
					})
			},
			orderStatusClass (status) {
				return utils.orderStatusClass(status);
			},
			orderStatus (status) {
				return utils.orderStatus(status);
			},
			payType (type) {
				return utils.payType(type);
			},
		},
	}
</script>
<style>
	.el-table th.is-leaf {
		color: #FFF;
		background: #409EFF;
	}
	.el-table td, .el-table th.is-leaf {
		text-align: center;
	}
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
	.order-section {
		margin: 0 0 30px;
	}
</style>