<template>
	<view class="heaven-page">
		<view class="drama-card">
			<u-lazy-load threshold="-450" border-radius="10" :image="drama.imageSrc">
			</u-lazy-load>
			<view class="demo-tag">
				<view>
					<h3>《{{ drama.title }}》</h3>
				</view>
				<view v-if="drama.station" class="demo-tag-owner">
					{{ drama.station }}
				</view>
				<view v-if="drama.subType" class="demo-tag-text">
					{{ drama.subType }}
				</view>
			</view>
		</view>
		<u-form :model="form" ref="subscribeForm">
			<u-form-item label="邮箱" prop="email">
				<u-input v-model="form.email" placeholder="请输入邮箱地址" />
			</u-form-item>
			<u-button @click="guestSubscribe">订阅</u-button>
		</u-form>
		<u-modal v-model="show" content="确认订阅邮件已发送到您的邮箱，请前往确认订阅！" @confirm="confirm"></u-modal>
		<u-toast ref="toast" />
	</view>
</template>

<script>
	import {
		subscribe
	} from '../../api/subscribe/subscribe.js'
	import {
		findDrama
	} from '../../api/drama.js'
	export default {
		data() {
			return {
				form: {
					email: ''
				},
				rules: {
					email: [{
						required: true,
						type: 'email',
						message: '请输入邮箱地址',
						trigger: ['change', 'blur'],
					}]
				},
				drama: {},
				show: false,
			}
		},
		onLoad: function(option) {
			if (option.drama) {
				findDrama(option.drama)
					.then(resp => {
						this.drama = resp.data;
					})
			}
		},
		methods: {
			guestSubscribe() {
				this.$refs.subscribeForm.validate(valid => {
					if (valid) {
						subscribe(this.form.email, this.drama.title)
							.then(resp => {
								this.show = true;
							}).catch(err => {
								this.$refs.toast.show({
									title: '服务器异常，请稍后重试！',
								})
							});
					}
				});
			},
			confirm() {
				uni.navigateTo({
					url: "/pages/index/index"
				})
			}
		},
		onReady() {
			this.$refs.subscribeForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	.heaven-page {
		padding: 8px;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		display: flex;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		display: flex;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		line-height: 1;
		padding: 4rpx 14rpx;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;

	}
</style>
