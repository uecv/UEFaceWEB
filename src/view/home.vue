<template>
	<div class="home">
		<!--TOP-->
		<div class="row head">
			<div class="col">
				<div class="Top_nav">
					<h3 class="title">UE FACE</h3>
					<div class="systools">
						<loginout></loginout>
					</div>
				</div>
			</div>
		</div>
		<div class="body">
			<!--MIDDLE-->
			<div class="row">
				<!--VideoZone-->
				<div class="col faceVideo">
					<div class="Zone">
						<h3>人脸识别</h3>
						<div class="content">
							<FaceVideo :url="camera_active.url"></FaceVideo>
						</div>
					</div>
				</div>
				<!--PicZone-->
				<div class="col cameraMap">
					<div class="Zone">
						<h3>
							园区平面图
							<button class="swichpage" @click="$router.push('/statistics')">数据统计</button>
						</h3>
						<div class="content">
							<MapZone @camerachange="camerachange"></MapZone>
						</div>
					</div>
				</div>
			</div>
			<!--BOTTOM-->
			<div class="row">
				<div class="col">
					<div class="Zone">
						<h3>今日已检测人数 <span>{{nums}}</span></h3>
						<div class="contentResult">
							<FaceResultList :cameraid="camera_active.id" @mes="faceListChange"></FaceResultList>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import FaceVideo from "@/components/FaceVideo"
	import MapZone from "@/components/MapZone"
	import FaceResultList from "@/components/FaceResultList"
	import loginout from 'components/logout'
	export default {
		name: 'home',
		components: {
			FaceVideo,
			MapZone,
			FaceResultList,
			loginout
		},
		data() {
			return {
				camera_active: {
					//当前选中的摄像头
					name: "",
					id: 0,
					url: "",
					x: 0,
					y: 0
				},
				nums: 0 //今日已检测人数
			}
		},
		methods: {
			//退出登录
			logout() {
				alert("Logout Success")
				console.log("退出")
			},
			faceListChange: function(data) {
				//人脸识别列表信息改变
				this.nums = data.nums
			},
			camerachange: function(data) {
				//摄像头改变
				this.camera_active = data
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: 'zzgflh';
		src: url('../fonts/zzgflh.otf');
	}
	.home {}
	.home .body {
		padding: 0rem 1.5rem;
	}
	/* ----- */
	.Top_nav {
		position: relative;
		width: 100%;
		height: 2.9rem;
		background-color: #2d4b6f;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.Top_nav .title {
		font-family: "zzgflh";
		position: relative;
		text-align: center;
		color: #ffffff;
	}
	.Top_nav .systools {
		position: absolute;
		right: 1rem;
	}
	/* ------------- */
	.faceVideo {
		width: 37.6rem !important;
		height: 24.2rem;
	}
	.faceVideo .content {
		height: 22.2rem;
		background-image: url('../img/ViedoBox.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding: 0.7rem;
	}
	.cameraMap {
		width: 26.6rem !important;
		height: 24.2rem;
	}
	.cameraMap .content {
		height: 22.2rem;
		background-image: url('../img/MapBox.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding: 0.7rem;
	}
	/* ------------ */
	.Zone {
		position: relative;
	}
	.right {
		margin-right: -30px;
	}
	.Zone h3 {
		/* padding-left: 1.5rem; */
		text-align: left;
		height: 2rem;
		font-size: 0.9rem;
		color: #333333;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.Zone h3 span {
		position: relative;
		border: 1px solid #4fa0f2;
		border-radius: 5px;
		color: #FFFFFF;
		font-size: 18px;
		padding: 3px;
		margin-left: 20px;
		padding-left: 10px;
		padding-right: 10px;
		background-color: #4fa0f2;
	}
	.content {
		/* margin-left: 1.5rem; */
	}
	.ContentResult {
		margin-left: 20px;
		padding: 5px;
	}
	span {
		cursor: pointer
	}
</style>