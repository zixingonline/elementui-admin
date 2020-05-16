<template>
	<div>
		<div class="page">
			<el-collapse v-model="activeNames">
				<el-collapse-item title="基本信息" name="info">
					<template slot="title">
				    	<h3 class="order-section-title">
				    		基本信息 <i class="header-icon el-icon-info"></i>
				    	</h3>
				    </template>
					<div class="table">
						<el-table 
							:data="orderData" 
							border
							tooltip-effect="dark" 
						>
							<el-table-column prop="id" label="ID" width="70"></el-table-column>
							<el-table-column prop="order_sn" label="订单号" min-width="200"></el-table-column>
							<el-table-column prop="price_num" label="金额">
								<template slot-scope="scope">
									<span class="bold status-error">{{scope.row.price_num}}</span>
								</template>
							</el-table-column>
							<el-table-column label="下单时间">
								<template slot-scope="scope">{{timeInit(scope.row.create_time)}}</template>
							</el-table-column>
							<el-table-column prop="order_status" label="订单状态">
								<template slot-scope="scope">
									<span :class="orderStatusClass(scope.row.order_status)">{{orderStatus(scope.row.order_status)}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="pay_type" label="支付方式">
								<template slot-scope="scope">
									<span :class="{'text-success': scope.row.pay_type != 0}">{{payType(scope.row.pay_type)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="支付时间">
								<template slot-scope="scope">{{timeInit(scope.row.pay_time)}}</template>
							</el-table-column>
						</el-table>
					</div>
				</el-collapse-item>

				<el-collapse-item title="物流信息" name="express">
					<template slot="title">
						<h3 class="order-section-title">
							物流信息 <i class="header-icon el-icon-location"></i>
						</h3>
				    </template>
					<div class="table">
						<el-table 
							:data="orderData" 
							border
							tooltip-effect="dark" 
							v-if="order.order_type == 1"
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

						<el-table 
							:data="orderData" 
							border
							tooltip-effect="dark" 
							v-else
						>
							<template v-if=""></template>
							<el-table-column prop="username" label="收货人"></el-table-column>
							<el-table-column prop="phone" label="手机号"></el-table-column>
							<el-table-column label="配送方式">自提</el-table-column>
							<el-table-column label="发货时间">
								<template slot-scope="scope">{{timeInit(scope.row.send_time)}}</template>
							</el-table-column>
						</el-table>
					</div>
				</el-collapse-item>

				<el-collapse-item title="订单信息" name="goods">
					<template slot="title">
						<h3 class="order-section-title">
							订单信息 <i class="header-icon el-icon-s-goods"></i>
						</h3>
				    </template>
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
							<el-table-column label="商品小计">
								<template slot-scope="scope">
									<span class="text-bold status-error">{{scope.row.goods_num * scope.row.goods_price}}</span>
								</template>
							</el-table-column>
						</el-table>

						<div class="order-tatal text-right">
							<span class="text-bold text-error order-total-coupon" v-if="order.coupon">（优惠券：{{order.coupon.info.money}}）</span>
							<span>实付款：<strong class="text-bold text-error order-total-price">￥{{order.price_num}}</strong></span>
							<span>（含运费：<span class="text-bold text-error">{{order.total_post_fee}}</span>）</span>
						</div>
					</div>
				</el-collapse-item>
			</el-collapse>
			
			<div class="order-actions flex-center">
				<el-button type="primary" v-if="order.order_status == 1">发货</el-button>
				<template v-else-if="order.order_status == 5">
					<el-button type="primary">通过</el-button>
					<el-button type="danger">拒绝</el-button>
				</template>
				<el-button type="primary" v-else-if="order.order_status == 7">退款</el-button>
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
				id: this.$route.params.id,
				order: {},
				orderData: [],
				goodsList: [],
				activeNames: [],
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
						this.order = data;
						this.orderData.push(data);
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
	.order-total-price {
		font-size: 18px;
	}
	.order-total-coupon {
		margin: 0 10px 0 0;
	}
	.order-tatal {
		margin-top: -1px;
		padding: 14px;
		border: 1px solid #eee;
	}
	.order-section-title {
		font-weight: bold;
		color: #337ab7;
	}
	.order-actions {
		padding: 40px 0 20px;
	}
	.order-actions .el-button {
		margin: 0 20px;
		width: 200px;
	}
</style>