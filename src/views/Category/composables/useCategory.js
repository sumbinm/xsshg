//封装分类数据业务代码

import {getCategroyAPI} from '@/apis/category'
import {onMounted, ref, } from 'vue'
import {useRoute} from 'vue-router'
import {onBeforeRouteUpdate} from 'vue-router'

export function userCategory(){
    //获取分类数据
const categoryData = ref({})
const route = useRoute()
const getCategroy = async (id = route.params.id) => {
  const res = await getCategroyAPI(id)
 categoryData.value = res.result
}

onMounted(() => getCategroy())

//目标：路由参数变化的时候 可以把分类数据接口重新发送
onBeforeRouteUpdate((to) => {
  // console.log('路由参数变化了')
  //存在问题：使用最新参数路由请求最新数据
  // watchEffect(()=> {getCategroy()})
  getCategroy(to.params.id)
})

return {
  categoryData
}

}