import axios from 'axios'
import { useUserStore } from '@/stores/user'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from "element-plus"
import router from '@/router'
// 创建axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  //从pinia中获取token
  const userStore = useUserStore()
  //按后端要求拼接数据

  const token = userStore.userInfo.token
  // console.log('@@@@@',token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  //统一错误提示
  ElMessage({
    message: e.response.data.message,
    type: 'error'
  })
  //401token失效处理
  //1.清楚本地一会数据
    //2.跳转到登录页
  if(e.response.status === 401){
    userStore.clearUserInfo()
    router.push('/login')
  }

  return Promise.reject(e)
})


export default http