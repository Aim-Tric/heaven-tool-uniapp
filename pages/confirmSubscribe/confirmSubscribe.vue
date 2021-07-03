<template>
	<view style="height: calc(100vh - 44px);">
		<u-empty v-if="!loading" :text="resultText" mode="list"></u-empty>
		<u-loading mode="circle" :show="loading"></u-loading>
		<u-toast ref="toast"></u-toast>
	</view>
</template>

<script>
	import {
		confirmSubscribe
	} from "../../api/subscribe/subscribe.js"
	export default {
		data() {
			return {
				loading: true,
				resultText: ''
			}
		},
		onLoad(options) {
			if (options.code) {
				confirmSubscribe(options.code)
					.then(resp => {
						this.loading = false;
						if (resp.code === "200") {
							this.resultText = "订阅成功！";
						} else {
							this.resultText = "订阅出错！请重试";
						}
					}).catch(err => {
						this.$refs.toast.show({
							title: '服务器出现异常，请重试！'
						})
					})
			}
		},
		methods: {

		},
	}
</script>

<style lang="scss">

</style>
