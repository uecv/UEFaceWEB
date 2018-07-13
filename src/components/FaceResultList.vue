<template>
	<transition-group class="FaceResultList" name="list">
		<div class="FaceResult" :key="item.id+index" v-for="(item,index) in showList">
			<span class="head"><img src="../img/time.png" >{{item.ts}}</span>
			<div class="content">
				<div class="resultImg">
					<img :src="'data:image/png;base64,'+item.raw_image">
					<img :src="'data:image/png;base64,'+item.image">
					<div class="similarity">{{item.similarity}}</div>
				</div>
				<div class="resultMsg">
					<h3 class="name">{{item.name}}</h3>
					<div class="info"></div>
				</div>
			</div>
		</div>
	</transition-group>
</template>

<script>
	import {
		sockethost
	} from '../service/HOST'
	import url from '../service/url'
	export default {
		name: 'FaceResultList',
		props: {
			cameraid: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				ws: null, //socket连接对象
				nums: 0, //当天检测人数
				List: [], //人脸识别数据列表(缓冲队列)
				showList: [] //人脸识别数据列表(显示队列)
			}
		},
		watch: {
			cameraid: function(val) {
				//外界传进id
				let sockectStatus = this.socketAble()
				if (val&&sockectStatus==true) {
					// console.info('切换',111)
					this.selectCamera(val)
				}
			}
		},
		mounted() {
			this.sockectInit()
		},
		methods: {
			sendmes: function() {
				//发送mes事件消息
				this.$emit('mes', {
					nums: this.nums
				})
			},
			socketAble: function() {
				//判断socket是否可以操作
				if (this.ws) {
					switch (this.ws.readyState) {
						case WebSocket.CONNECTING:
							// do something
							// this.$message({
							// 	showClose: true,
							// 	message: '正在连接数据源还不能操作',
							// 	type: 'error'
							// })
							return false
							break;
						case WebSocket.OPEN:
							// do something
							return true
							break;
						case WebSocket.CLOSING:
							// do something
							// this.$message({
							// 	showClose: true,
							// 	message: '正在关闭连接不能操作',
							// 	type: 'error'
							// })
							return false
							break;
						case WebSocket.CLOSED:
							// do something
							// this.$message({
							// 	showClose: true,
							// 	message: '连接已关闭不能操作',
							// 	type: 'error'
							// })
							return 'close'
							break;
						default:
							// this never happens
							return false
							break;
					}
				} else {
					return false
				}
			},
			sockectInit: function() {
				//连接socket服务 初始化
				this.ws = new WebSocket(sockethost + url.CAMERASOCKET)
				this.ws.onopen = (event) => {
					console.log("socket服务开启")
					// setInterval(() => {
					// 	console.info('1')
					// 	this.ws.emit('my_result')
					// }, 1000)
					let sockectStatus = this.socketAble()
			
					if (this.cameraid&&sockectStatus==true) {
						// console.info('socket信息', 233)
						this.selectCamera(this.cameraid)
					}
					this.infoShowInit()
				}
				this.ws.onmessage = (event) => {
					let data = JSON.parse(event.data)
					console.info('socket信息', data)
					this.getTodayNums(data)
					this.getFaceResult(data)
				}
				this.ws.onclose = (event) => {
					console.log("socket服务关闭")
				}
			},
			getTodayNums: function(data) {
				//获取当天检测人数
				if (data.type == "GET_COUNT") {
					this.nums = data.NUMS
					this.sendmes()
				}
			},
			getFaceResult: function(data) {
				//获取人脸数据返回
				if (data.type == "GET_RECO_RESULT") {
					this.List.push({
						id: data.id,
						image: data.image,
						name: data.name,
						raw_image: data.raw_image,
						ts: data.ts,
						similarity: data.similarity
					})
				}
			},
			infoShowInit: function() {
				//初始化显示识别信息 队列获取操作
				setInterval(() => {
					if (this.List.length > 0) {
						if (this.showList.length > 3) {
							this.showList.splice(0, 1)
						}
						let mes = this.List.shift() //获取信息
						setTimeout(() => {
							this.showList.push(mes)
						}, 1000)
					}
				}, 3000)
			},
			selectCamera: function(id) {
				//选择摄像头数据
				// if (id) {
				// 	this.ws.send({
				// 		type: "POST_CHANGE_CAM",
				// 		id: id
				// 	})
				// }
				if (id) {
					let sockectStatus = this.socketAble() //
					if (sockectStatus && sockectStatus != 'close') {
						this.ws.send({
							type: "POST_CHANGE_CAM",
							id: id
						})
					} else if (sockectStatus == 'close') {
						this.sockectInit()
						// this.selectCamera(id)
						this.$message({
							showClose: true,
							message: 'socket已关闭',
							type: 'error'
						})
					}
				}
			}
		}
	}
</script>

<style scoped>
	html,
	body {
		margin: 0;
		padding: 0;
	}
	.FaceResultList {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		position: relative;
		overflow: hidden;
		height: 9rem;
	}
	.FaceResult {
		width: 15.5rem;
		height: 9rem;
		display: flex;
		margin-right: 1rem;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		background-image: url('../img/FaceBox.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding: 0.5rem 1rem;
		display: inline-block;
		position: relative;
	}
	.FaceResult:nth-child(4n-4) {
		margin-right: 0rem;
	}
	.FaceResult .head {
		color: #6d7d91;
		font-size: 0.7rem;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		height: 1.2rem;
	}
	.FaceResult .head img {
		margin-top: 0.1rem;
		margin-right: 0.3rem;
		width: 0.7rem;
	}
	.FaceResult .content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.FaceResult .content .resultImg {
		position: relative;
		background: url('../img/resultBox.png');
		width: 10.2rem;
		height: 6.7rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 0.25rem;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.FaceResult .content .resultImg img {
		width: 50%;
		height: 100%;
	}
	.FaceResult .content .resultImg .similarity {
		width: 3rem;
		height: 1rem;
		background: #6d7d91;
		position: absolute;
		left: 3.4rem;
		bottom: 0.25rem;
		font-size: 0.8rem;
		line-height: 1.1rem;
		color: #fff;
	}
	.FaceResult .content .resultMsg {
		width: 4rem;
		text-align: left;
		box-sizing: border-box;
		padding-left: 0.5rem;
	}
	.FaceResult .content .resultMsg .name {
		font-size: 0.8rem;
	}
	.FaceResult .content .resultMsg .info {
		font-size: 0.7rem;
	}
</style>