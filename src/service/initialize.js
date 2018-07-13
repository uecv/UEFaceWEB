//初始化函数
export default function() {
    let currentW = window.screen.width //当前屏幕宽
    let defaultW = 1366 //预设宽度分辨率
    let defaultF = 20 //预设文字大小(1rem=20px)
    let rat = currentW / defaultW //比率
    let currentF = defaultF * rat //当前需要的fonsize值

    let parentElement = document.getElementById('html') //根节点
    let styleString = '' + currentF + 'px' //样式字符串

    parentElement.style.fontSize = styleString
    parentElement.style.overflowX = 'hidden'

}