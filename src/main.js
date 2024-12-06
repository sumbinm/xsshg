import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// 引入初始化样式文件
import '@/styles/common.scss'
//引入懒加载插件
import { lazyPlugin } from "@/directives/index"
// import{useIntersectionObserver} from '@vueuse/core'

//定义全局指令
//引入懒加载指令插件并注册
import { componentPlugin } from "@/components/index"

//测试接口函数
import { getCategroy } from '@/apis/test'
getCategroy().then(res => {
  console.log(res)
})
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
//注册懒加载插件
app.use(lazyPlugin)
app.use( componentPlugin)
app.mount('#app')
//注册持久化插件
pinia.use(piniaPluginPersistedstate)


// app.directive('img-lazy',{
//   mounted(el,binding){
//     //el:指令绑定的元素
//     //binding: binding.value指令对象 指令等于号后面绑定的表达式的值 图片Url
//     console.log(el,binding.value)
//     useIntersectionObserver(
//       el,
//       ([{isIntersecting}])=>{
//       console.log(isIntersecting) 
//       //进入视口区域
//       el.src = binding.value
//     },
//   )
//   }
// })



// app.use(lazyPlugin)

