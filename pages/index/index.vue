<template>
	<view class="heaven-page">
		<u-search placeholder="请输入剧集名称" v-model="keyword" shape="round" :clearabled="true" :show-action="true"
			@search="search" @custom="search" @change="change">
		</u-search>
		<u-waterfall v-model="flowList" ref="uWaterfall">
			<template v-slot:left="{leftList}">
				<template v-for="(item, index) in leftList">
					<view class="demo-warter" @click="() => { toSubscribe(item.title) }" :key="index">
						<u-lazy-load class="demo-image" threshold="-450" border-radius="10" :image="item.imageSrc"
							:index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{ item.title }}
						</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">
								{{ item.station }}
							</view>
							<view class="demo-tag-text">
								{{ item.subType }}
							</view>
						</view>
					</view>
				</template>
			</template>
			<template v-slot:right="{rightList}">
				<template v-for="(item, index) in rightList">
					<view class="demo-warter" @click="() => { toSubscribe(item.title) }" :key="index">
						<u-lazy-load class="demo-image" threshold="-450" border-radius="10" :image="item.imageSrc"
							:index="index">
						</u-lazy-load>
						<view class="demo-title">
							{{ item.title }}
						</view>
						<view class="demo-tag">
							<view v-if="item.station" class="demo-tag-owner">
								{{ item.station }}
							</view>
							<view v-if="item.subType" class="demo-tag-text">
								{{ item.subType }}
							</view>
						</view>
					</view>
				</template>
			</template>
		</u-waterfall>
		<u-loadmore v-if="hasMore" bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData">
		</u-loadmore>
	</view>
</template>

<script>
	import {
		searchByKeyword,
		page
	} from "../../api/drama.js"
	export default {
		data() {
			return {
				keyword: '',
				loadStatus: 'loadmore',
				flowList: [],
				hasMore: false,
				searched: false,
				page: 1,
				backup: []
			};
		},
		onLoad() {
			this.fetchData();
		},
		onReachBottom() {
			if (!this.searched) {
				this.loadStatus = 'loading';
				setTimeout(() => {
					this.fetchData();
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		methods: {
			fetchData() {
				page(this.page++)
					.then(res => {
						for (let o of res.data.list) {
							this.flowList.push(o);
						}
					});
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			clear() {
				this.$refs.uWaterfall.clear();
			},
			toSubscribe(drama) {
				uni.navigateTo({
					url: '/pages/touristSubscribe/touristSubscribe?drama=' + drama,
					success: res => {},
					fail: () => {},
					complete: () => {}
				})
			},
			search() {
				this.searched = true;
				this.backup = this.flowList;
				searchByKeyword(this.keyword)
					.then(res => {
						this.clear();
						setTimeout(() => {
							for (let o of res.data) {
								this.flowList.push(o);
							}
						}, 1000)
					})
			},
			change() {
				if (this.keyword === "") {
					this.searched = false;
					this.clear();
					setTimeout(() => {
						for (let o of this.backup) {
							this.flowList.push(o);
						}
					}, 1000);
				}
			}
		},
	}
</script>

<style lang="scss">
	.heaven-page {
		padding: 8rpx;
	}

	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;

	}
</style>
