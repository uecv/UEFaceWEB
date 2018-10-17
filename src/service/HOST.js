var domain = document.domain;
//export const HOST = '' // 本地代理请求路径
export const HOST = '/api' // 本地代理请求路径
    // export const HOST = 'http://192.168.0.245' // 公司服务器
    // export const HOST = 'http://183.3.139.134:6004' //外部服务器
    // export const HOST = 'http://localhost:6002' //内网服务器

console.info('domain', domain)
export const sockethost = 'ws://' + domain + ':5000' //socket服务地址
