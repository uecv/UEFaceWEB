import moment from 'moment' //时间处理库(建议后台做时间处理)
// console.log(moment().days(-1).format('Y-M-D'))



export default {

    YMD: function(date) {
        //日期转化为YMD模式
        return moment(date).format('Y-M-D')
    },
    TMDTime: function(date) {
        //时间格式
        return moment(date).format('Y-M-D HH:mm:ss')
    },
    todayTime: function() {
        //今天
        return moment().format('Y-M-D H:mm')
    },

    today: function() {
        //今天
        return moment().format('Y-M-D')
    },
    yesterday: function() {
        //昨天
        return moment().days(-1).format('Y-M-D')
    },
    aweek: function() {
        //一周内
        return {
            start: moment().days(-7).format('Y-M-D'),
            end: moment().format('Y-M-D')
        }
    },
    amounth: function() {
        //一月内
        return {
            start: moment().days(-30).format('Y-M-D'),
            end: moment().format('Y-M-D')
        }
    }

}