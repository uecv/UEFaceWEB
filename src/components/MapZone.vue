<template>
	<div ref="mapwindow" class="MapZone">
		<div ref="map" class="map">
			<img class="bg" @load="initMap" src="../img/map.png" />
			<div class="cameras">
				<img class="item clickable" :title="camera.name" @click="cameraselect(camera)" :key="camera.id" v-for="camera in mapcameras" :style="{left:camera.x*mapScale+'px',top:camera.y*mapScale+'px'}" :src="camera_active==camera.id?require('../img/camera_pressed.png'):require('../img/camera_nor.png')"
				    alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import http from '../service/myHttp'
	import url from '../service/url'
	// let cameranormal= require('../img/camera_nor.png')
	// let camera_pressed= require('../img/camera_pressed.png')
	export default {
		name: 'MapZone',
		props: {},
		data() {
			return {
				mapScale: 1, //地图放大缩小的比例 
				camera_active: 0, //选中的当前摄像头id
				mapdata: { //当前地图信息
					map: "",
					camera: [{
							name: "摄像头A",
							id: 1,
							url: "192.168.0.245:8888/live/livestream.flv",
							x: 1,
							y: 2
						},
						{
							name: "摄像头B",
							id: 1,
							url: "http://192.168.0.245:8888/live/livestream2.flv",
							x: 3,
							y: 5
						}
					]
				},
				mapcameras: [
					// 	{ //地图打点的摄像头信息
					// 	name: "摄像头A",
					// 	id: 1,
					// 	url: "192.168.0.245:8888/live/livestream.flv",
					// 	x: 100,
					// 	y: 100
					// }
				]
			}
		},
		mounted() {
			// this.initInfo()
		},
		methods: {
			pageClick: function(index) {
				// this.$emit('update:value',index)
				// this.$emit('pageClick')
			},
			initInfo: function() {
				//初始化数据
				this.getmapdata()
			},
			getmapdata: function() {
				//获取地图数据
				return new Promise((resolve, reject) => {
					http.get(url.GRTCAMERA).then(res => {
						this.mapdata = res.data
						var cameras = this.mapdata.camera
						var domain = document.domain;
						for (var i=0;i<cameras.length;i++)
						{ 
							cameras[i].url = cameras[i].url.replace(/nginx/, domain)
							console.info(cameras[i].url)
						}
						
						resolve(this.mapdata)
					}).catch(err => {
						reject(err)
					})
				})
			},
			cameraselect: function(camera) {
				//摄像头选择
				this.camera_active = camera.id
				this.$emit("camerachange", camera)
			},
			initMap: function() {
				//初始化地图
				//初始化地图大小
				this.mapcameras = [] //清空摄像头
				let mapwindow = this.$refs.mapwindow //地图窗口
				let map = this.$refs.map //地图
				let bgmap = map.querySelector('.bg') //地图底图
				let imgrat = bgmap.offsetWidth / bgmap.offsetHeight //原图片比例
				let windowrat = mapwindow.offsetWidth / mapwindow.offsetHeight //原窗口比例
				console.log(map.style)
				if (imgrat > windowrat) {
					bgmap.style.transformOrigin = "center"
					this.mapScale = mapwindow.offsetWidth / bgmap.offsetWidth
					// bgmap.style.transform = "scale(" + this.mapScale + ")"
					bgmap.style.width = bgmap.offsetWidth * this.mapScale + "px"
				} else {
					bgmap.style.transformOrigin = "center"
					this.mapScale = mapwindow.offsetHeight / bgmap.offsetHeight
					bgmap.style.width = bgmap.offsetWidth * this.mapScale + "px"
					// bgmap.style.transform = "scale(" + this.mapScale + ")"
				}
				//初始化地图大小后
				this.getmapdata().then(mapdata => {
					//获取当前地图信息 （摄像头列表）
					this.mapcameras = mapdata.camera
					if (this.mapcameras.length > 0) {
						this.cameraselect(this.mapcameras[0]) //选择第一个摄像头做默认播放
					}
				})
			}
		}
	}
</script>

<style scoped>
	.MapZone {
		/* border: 1px solid #ebebeb; */
		/* border-radius: 0.4rem; */
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	.map {
		/* background-color: rgb(103, 168, 221); */
		width: initial;
		height: initial;
		position: relative;
	}
	.map .bg {
		width: initial;
		height: initial;
	}
	.map .cameras {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		width: 100%;
		height: 100%;
	}
	.map .cameras .item {
		position: absolute;
		z-index: 3;
		width: 0.8rem;
		transform: translate(-50%, -50%);
	}
</style>