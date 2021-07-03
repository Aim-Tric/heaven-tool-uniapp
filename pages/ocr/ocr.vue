<template>
	<view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
			style="height: 800rpx;">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;">
					<u-upload action="/api/ocr/pic" upload-text="选择图片" @on-success="imgUploadSuccess" :max-count="1">
					</u-upload>
					<u-field v-model="imgOcrResult" label="转换结果" type="textarea" :disabled="true">
					</u-field>
					<u-button @click="copyContent()" class="copy-btn">复制结果</u-button>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;">
					<u-upload @before-upload="beforeDocUpload" @on-success="docUploadSuccess" action="/api/ocr/doc" upload-text="选择文档" :max-count="1" :limitType="['doc', 'docx']"></u-upload>
					<view>
						<p>说明：</p>
						<p>文档批量解析需要上传文档，请将所有需要解析的图片放置到文档中，解析结果将于图片顺序保持一致，最终解析完成后返回文档文件。（更丰富的功能敬请期待！）</p>
					</view>
					<u-loading mode="circle" :show="parsing"></u-loading>
				</scroll-view>
			</swiper-item>
		</swiper>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '图片解析'
				}, {
					name: '文档批量解析'
				}],
				current: 0,
				swiperCurrent: 0,
				imgOcrResult: undefined,
				parsing: false,
			}
		},
		methods: {
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			imgUploadSuccess(data, index, lists, name) {
				this.imgOcrResult = data.data
			},
			beforeDocUpload(index, list) {
				this.parsing = true
			},
			docUploadSuccess(data, index, lists, name) {
				if(data.code === '200') {
					let key = data.data
					let downloadLink = document.createElement('a')
					downloadLink.href = '/api/file/download?key=' + key
					downloadLink.click()
					downloadLink.remove()
					this.$refs.uToast.show({
						title: '开始下载文件',
						type: 'success',
					})
				} else {
					uni.showToast({
						title: '文件解析失败，请检查格式是否正确'
					})
				}
			},
			copyContent() {
				// #ifdef H5
				this.$copyText(this.imgOcrResult).then(
					res => {
						this.$refs.uToast.show({
							title: '复制成功',
							type: 'success',
						})
					}
				)
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: this.imgOcrResult,
					success: () => {
						this.$refs.uToast.show({
							title: '复制成功',
							type: 'success',
						})
					}
				})
				// #endif
			}
		}
	}
</script>

<style>

</style>
