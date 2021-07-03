<template>
	<view>
		<u-grid :col="3">
			<u-grid-item v-for="(item,index) in applications" :key="index">
				<u-icon name="hourglass-half-fill" :size="46"></u-icon>
				<view class="grid-text" @click="goToApp(item.address)">{{ item.name }}</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	import {
		listApplication
	} from '../../api/guide.js'
	export default {
		data() {
			return {
				applications: []
			}
		},
		onLoad() {
			this.fetchData();
		},
		methods: {
			fetchData() {
				listApplication().then(resp => {
					for (let d of resp.data) {
						this.applications.push(d)
					}
				})
			},
			goToApp(address) {
				uni.navigateTo({
					url: address,
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
