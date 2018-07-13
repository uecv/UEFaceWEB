<template>
    <div class="FaceViedo">
        <video ref="video" @canplay="canplay" controls autoplay>Your browser is too old which doesn't support HTML5 video.</video>
    </div>
</template>
<script>
    import flvjs from 'flv.js/dist/flv.min'
    export default {
        name: 'FaceViedo',
        props: {
            url: { //传入直播流地址
                type: String,
                default: ''
            }
        },
        data() {
            return {
                player: this.$refs.video
            }
        },
        watch: {
            url: function(val) {
                //监听直播地址更新
                this.initVideo()
            }
        },
        mounted() {
            // console.info('直播库', flvjs)
        },
        methods: {
            pageClick: function(index) {
                // this.$emit('update:value',index)
                // this.$emit('pageClick')
            },
            initVideo: function() {
                //初始化直播流播放器
                // console.info('直播库', flvjs)
                let player = this.$refs.video //video标签
                if (flvjs.isSupported()) {
                    let flvPlayer = flvjs.createPlayer({
                        type: 'flv',
                        url: this.url,
                        hasAudio: false,
                        // duration: 0
                    }, {
                        enableStashBuffer:false,
                        // lazyLoad: false
                    })
                    flvPlayer.attachMediaElement(player);
                    flvPlayer.load() //加载
                } else {
                    this.$message({
                        showClose: true,
                        message: '浏览器不支持flv播放',
                        type: 'error'
                    })
                }
                // function flv_pause() {
                //     player.pause();
                // }
                // function flv_destroy() {
                //     player.pause();
                //     player.unload();
                //     player.detachMediaElement();
                //     player.destroy();
                //     player = null;
                // }
                // function flv_seekto() {
                //     player.currentTime = parseFloat(document.getElementsByName('seekpoint')[0].value);
                // }
            },
            canplay: function() {
                //可以播放
                let player = this.$refs.video //video标签
                // if(player.buffered.length>0){
                //     console.info('缓冲',player.buffered.length)
                //     player.currentTime=player.buffered.end(1)
                // }
                player.play()
            }
        }
    }
</script>

<style>
    .FaceViedo {
        /* border: 1px solid #ebebeb; */
        border-radius: 0.4rem;
        width: 100%;
        height: 100%;
    }
    .FaceViedo video {
        width: 100%;
        height: 100%;
    }
</style>