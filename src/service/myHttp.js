//get的基础自定义
import { Loading } from 'element-ui'; //加载动效
import { Message } from 'element-ui'; //信息弹窗
import { router } from 'routers' //配置完毕的路由
import { HOST } from '../service/HOST'

//import vue from 'vue'

function err_dispose(err) {
    //请求状态异常处理函数
    if (err.status == 500) {

        Message({
            message: '请求失败请检查网络',
            type: 'error',
            showClose: true
        })

    } else {

        Message({
            message: '未知错误',
            type: 'error',
            showClose: true
        })

    }
}

// function res_dispose(res, resolve, reject) {
//     //自定义业务返回信息判断
//     let data = res.data
//     console.info('信息', res)
//     if (data.status == 'err') {
//         //操作异常

//         switch (data.code) {
//             // case 500:
//             //     // router.push('/login')
//             //     Message({
//             //         message: '未登录或过期',
//             //         type: 'error',
//             //         showClose: true
//             //     })
//             //     reject('失败')
//             //     break;
//             default:

//                 if (data.mes && data.mes.errors) {
//                     Message({
//                         message: data.mes.errors[0].message,
//                         type: 'error',
//                         showClose: true
//                     })
//                     reject('错误')
//                 } else {
//                     Message({
//                         message: '未知错误',
//                         type: 'error',
//                         showClose: true
//                     })
//                     reject('错误')
//                 }

//             break;

//         }
//     } else {

//         switch (data.code) {
//             // case 500:
//             //     // router.push('/login')
//             //     Message({
//             //         message: '未登录或过期',
//             //         type: 'error',
//             //         showClose: true
//             //     })
//             //     reject('失败')
//             //     break;
//             default:

//                 if (data.status == 'success') {
//                 Message({
//                     message: data.mes,
//                     type: 'success',
//                     showClose: true
//                 })
//                 resolve(res)
//             }if (data.status == 'fail') {
//                 Message({
//                     message: data.mes,
//                     type: 'error',
//                     showClose: true
//                 })
//                 reject('失败')
//             } else {
//                 resolve(res)
//             }

//             break;

//         }
//     }


// }

//import qs from 'qs'; //请求参数处理库
import axios from 'axios' //请求库
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //请求头
axios.defaults.withCredentials = true, // 跨域凭证获取
    axios.defaults.baseURL = HOST; //url公共前缀

export default {
    get: function(url, info) {
        //get请求    
        return new Promise(function(resolve, reject) {
            // let currentLoad = Loading.service({ //加载特效
            //         text: '加载中。。。'
            //     })
            //get请求
            axios.get(url, { params: info }).then(
                res => {

                    // res_dispose(res, resolve, reject)
                    resolve(res)
                        // console.log(res)
                        // currentLoad.close()

                }
            ).catch(
                err => {
                    err_dispose(err) //错误处理
                    reject(err)
                        // currentLoad.close()
                }
            )

        })

    },
    post: function(url, info) {
        //post请求
        return new Promise(function(resolve, reject) {

            // let currentLoad = Loading.service({ //加载特效
            //     text: '加载中。。。'
            // })

            //get请求
            axios.post(url, info, { //qs序列化参数 做成stringformdate格式(java后台需要)
                headers: { //头部配置
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' //(java后台需要)
                },
                // params: info,
                // paramsSerializer: function(params) {
                //     return Qs.stringify(params, { arrayFormat: 'brackets' })
                // },
            }).then(
                res => {
                    // res_dispose(res, resolve, reject)
                    resolve(res) //解析结果为json
                        // currentLoad.close()
                }
            ).catch(
                err => {
                    // currentLoad.close()
                    err_dispose(err)
                    reject(err)
                }
            )
        })

    }
}