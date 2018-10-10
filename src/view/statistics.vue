<template>
	<div class="statistics">
		<!--统计-->
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
				<!--设备总数-->
				<div class="col deviceNum">
					<div class="Zone">
						<h3> <img class="icon" src="../img/数据统计.png" alt=""> 数据统计</h3>
						<div class="content">
							<div class="sum">
								<img src="../img/设备.png" alt="">
								<div class="vaule">
									<p class="name">设备总数</p>
									<p class="num">{{camnum.total}}</p>
								</div>
							</div>
							<div class="statsX">
								<div class="item">
									<p class="name">在线</p>
									<p class="num">{{camnum.online}}</p>
								</div>
								<div class="item">
									<p class="name">离线</p>
									<p class="num">{{camnum.outline}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--识别人数-->
				<div class="col identifyNum">
					<div class="Zone">
						<h3><button class="swichpage" @click="$router.push('/home')">返回首页</button></h3>
						<div class="content">
							<div class="sum">
								<img src="../img/人脸识别.png" alt="">
								<div class="vaule">
									<p class="name">今日识别人数</p>
									<p class="num">{{todaynum.total}}</p>
								</div>
							</div>
							<div class="statsX">
								<div class="item">
									<p class="name">与人脸库匹配</p>
									<p class="num">{{todaynum.know}}</p>
								</div>
								<div class="item">
									<p class="name">与人脸库不匹配</p>
									<p class="num">{{todaynum.unknow}}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--过去一周-->
			<div class="row">
				<div class="col">
					<div class="Zone lastweek">
						<h3></h3>
						<div class="content">
							<charts :show="true" :option="option"></charts>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import loginout from "components/logout";
	import charts from "components/charts"
	import http from "../service/myHttp.js";
	import urls from "../service/url.js";
	import simdate from "../service/simdate.js"
	export default {
		name: "statistics",
		components: {
			loginout,
			charts
		},
		data() {
			return {
				// simdate:simdate,
				camnum: {
					//设备信息
				},
				todaynum: {
					//获取今日识别人数
				},
				lastweekdata: {
					//过去一周的人脸匹配数据
				},
			}
		},
		mounted() {
			this.init()
		},
		computed: {
			option() {
				let dateArry = [] //日期数组
				let knows = [] //匹配数组
				let notknows = [] //不匹配数组
				if (this.lastweekdata.know) {
					Object.keys(this.lastweekdata.know).forEach(key => {
						dateArry.push(key)
						knows.push(this.lastweekdata.know[key])
						notknows.push(this.lastweekdata.unknow[key])
					})
					return {
						// 过去一周 柱状图配置
						// backgroundColor: '#23243a',
						title: {
							text: '过去一周',
							textStyle: {
								color: '#525252',
								fontStyle: 'normal',
								fontFamily: '微软雅黑',
								fontSize: 20
							},
							left: 20,
							top: 12
						},
						tooltip: { //提示框组件
							trigger: 'axis',
							formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
							axisPointer: {
								type: 'shadow',
								label: {
									backgroundColor: '#6a7985'
								}
							},
							textStyle: {
								color: '#fff',
								fontStyle: 'normal',
								fontFamily: '微软雅黑',
								fontSize: 20,
							}
						},
						grid: {
							left: '2.5%',
							right: '2.5%',
							bottom: '6%',
							top: '17%',
							padding: '0 0 10 0',
							containLabel: true,
						},
						legend: { //图例组件，颜色和名字
							right: 20,
							top: 10,
							itemGap: 50,
							itemWidth: 12,
							itemHeight: 12,
							data: [{
									name: '与人脸库匹配',
									icon: 'circle', //路径
								},
								{
									name: '与人脸库不匹配',
									icon: 'circle'
								}
							],
							textStyle: {
								color: '#525252',
								fontStyle: 'normal',
								fontFamily: '微软雅黑',
								fontSize: 18,
							}
						},
						xAxis: [{
							type: 'category',
							boundaryGap: true, //坐标轴两边留白
							data: dateArry,
							axisLabel: { //坐标轴刻度标签的相关设置。
								interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
								margin: 15,
								textStyle: {
									color: '#525252',
									fontStyle: 'normal',
									fontFamily: '微软雅黑',
									fontSize: 20,
								}
							},
							axisTick: { //坐标轴刻度相关设置。
								show: false,
							},
							axisLine: { //坐标轴轴线相关设置
								show: true,
								lineStyle: {
									color: '#999999',
									opacity: 1,
									width: 1,
								}
							},
							splitLine: { //坐标轴在 grid 区域中的分隔线。
								show: false,
							}
						}],
						yAxis: [{
							type: 'value',
							splitNumber: 5,
							axisLabel: {
								textStyle: {
									color: '#525252',
									fontStyle: 'normal',
									fontFamily: '微软雅黑',
									fontSize: 20,
								}
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false,
								// lineStyle: {
								// 	color: ['#fff'],
								// 	opacity: 0.06
								// }
							}
						}],
						series: [{
								name: '与人脸库匹配',
								type: 'bar',
								data: knows,
								barWidth: 30,
								barGap: 0, //柱间距离
								label: { //图形上的文本标签
									normal: {
										show: true,
										position: 'top',
										textStyle: {
											color: '#525252',
											fontStyle: 'normal',
											fontFamily: '微软雅黑',
											fontSize: 20,
										},
									},
								},
								itemStyle: { //图形样式
									normal: {
										barBorderRadius: [5, 5, 0, 0],
										color: "#f8b551",
									},
								},
							},
							{
								name: '与人脸库不匹配',
								type: 'bar',
								data: notknows,
								barWidth: 30,
								barGap: 0.4, //柱间距离
								label: { //图形上的文本标签
									normal: {
										show: true,
										position: 'top',
										textStyle: {
											color: '#525252',
											fontStyle: 'normal',
											fontFamily: '微软雅黑',
											fontSize: 20,
										},
									},
								},
								itemStyle: { //图形样式
									normal: {
										barBorderRadius: [5, 5, 0, 0],
										color: "#45c2ee",
									},
								}
							}
						]
					}
				} else {
					return {}
				}
			}
		},
		methods: {
			//退出登录
			logout() {
				alert("Logout Success");
				console.log("退出");
			},
			init() {
				//初始化
				this.getCamNum()
				this.getTodayNum()
				this.getLastWeek()
			},
			getCamNum() {
				//获取设备信息
				return new Promise((resolve, reject) => {
					http
						.get(urls.HQSBSL)
						.then(res => {
							console.log(res)
							this.camnum = res.data
							resolve(res)
						})
						.catch(err => {
							reject(err)
							console.info('错误', err)
						});
				})
			},
			getTodayNum() {
				//获取今日识别人数
				return new Promise((resolve, reject) => {
					http
						.post(urls.HQJRSBRS, {
							today: simdate.today()
						})
						.then(res => {
							console.log(res)
							this.todaynum = res.data
							resolve(res)
						})
						.catch(err => {
							reject(err)
							console.info('错误', err)
						});
				})
			},
			getLastWeek() {
				//获取一周人脸匹配情况
				return new Promise((resolve, reject) => {
					http
						.post(urls.HQYZRLPP, {
							date: simdate.today()
						})
						.then(res => {
							console.log(res)
							this.lastweekdata = res.data
							resolve(res)
						})
						.catch(err => {
							reject(err)
							console.info('错误', err)
						});
				})
			}
		}
	};
</script>

<style>
	@font-face {
		font-family: "zzgflh";
		src: url("../fonts/zzgflh.otf");
	}
	.statistics {
		width: 100%;
		min-height: 100%;
		background-color: #f0f4fd;
	}
	.statistics .body {
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
	/* ----数据统计---- */
	.deviceNum {
		width: 31.6rem !important;
		height: 14rem;
	}
	.deviceNum .content {
		height: 12rem;
		/* background-image: url('../img/ViedoBox.png'); */
		/* background-color: #FFFFFF; */
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		/* padding: 0.7rem; */
	}
	.identifyNum {
		width: 31.6rem !important;
		height: 14rem;
	}
	.identifyNum .content {
		height: 12rem;
		/* background-image: url('../img/MapBox.png'); */
		/* background-color: #FFFFFF; */
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		/* padding: 0.7rem; */
	}
	.deviceNum .content .sum,
	.identifyNum .content .sum {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 6rem;
		border-radius: 0.4rem;
		color: #ffffff;
		overflow: hidden;
	}
	.deviceNum .content .sum {
		background-color: #7398e4;
	}
	.identifyNum .content .sum {
		background-color: #8ddabd;
	}
	.deviceNum .content .sum .vaule,
	.identifyNum .content .sum .vaule {
		padding-right: 2.5rem;
	}
	.deviceNum .content .sum .vaule .name,
	.identifyNum .content .sum .vaule .name {
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}
	.deviceNum .content .sum .vaule .num,
	.identifyNum .content .sum .vaule .num {
		font-size: 3rem;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;
	}
	.deviceNum .content .sum img,
	.identifyNum .content .sum img {
		width: 6.1rem;
		margin-top: 0.8rem;
		padding-left: 0.4rem;
		align-self: flex-start;
	}
	.deviceNum .content .sum,
	.identifyNum .content .sum {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 6rem;
		border-radius: 0.4rem;
		color: #ffffff;
		overflow: hidden;
	}
	.deviceNum .content .statsX,
	.identifyNum .content .statsX {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 6rem;
	}
	.deviceNum .content .statsX .name,
	.identifyNum .content .statsX .name {
		font-size: 0.9rem;
		margin-bottom: 0.7rem;
	}
	.deviceNum .content .statsX .num,
	.identifyNum .content .statsX .num {
		font-size: 2rem;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;
	}
	.lastweek {
		width: 65.3rem !important;
		height: 20.7rem;
	}
	.lastweek .content {
		width: 65.3rem;
		height: 18.7rem;
		/* background-image: url('../img/MapBox.png'); */
		/* background-color: #FFFFFF; */
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		/* padding: 0.7rem; */
	}
	/* ------------ */
	.Zone {
		position: relative;
	}
	.right {
		margin-right: -30px;
	}
	.Zone h3 {
		position: relative;
		/* padding-left: 1.5rem; */
		text-align: left;
		height: 2rem;
		font-size: 0.9rem;
		color: #333333;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.Zone h3 .icon {
		width: 1rem;
		margin-right: 0.6rem;
	}
	.Zone h3 span {
		border: 1px solid #4fa0f2;
		border-radius: 5px;
		color: #ffffff;
		font-size: 18px;
		padding: 3px;
		margin-left: 20px;
		padding-left: 10px;
		padding-right: 10px;
		background-color: #4fa0f2;
	}
	.lastweek h3 {
		height: 1rem;
	}
	.content {
		/* margin-left: 1.5rem; */
		border-radius: 0.4rem;
		background-color: #ffffff;
		box-shadow: 0 0 1rem #ddd;
	}
	/* .contentResult {
																														margin-left: 20px;
																														padding: 5px;
																														border-radius: 0.4rem;
																														background-color: #FFFFFF;
																													} */
	span {
		cursor: pointer;
	}
</style>