import axios from 'axios'

// 调用axios.creat()函数，创建一个axios的实例对象，用request来接受
const request = axios.create({
  // 指定跟路径
  baseURL: 'https://www.escook.cn'
})
export default request
