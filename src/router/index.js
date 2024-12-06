import { createRouter, createWebHistory } from 'vue-router'
// import Layout from '@/views/Layout/index.vue'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import cartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack  from '@/views/Pay/PayBack.vue' 
import Member from '@/views/Member/index.vue'
import MemberInfo from '@/views/Member/cpmponent//userInfo.vue'
import MemberOrder from '@/views/Member/cpmponent/userOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      // name: 'home',
      component: Layout,
      children:[
        {
          path:'',
          component:Home
        },
        {
          path:'category/:id',
          component:Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },{
          path:'cartList',
          component:cartList
        },{
          path:'checkout',
          component:Checkout
        },{
          path:'pay',
          component:Pay
        },{
          path:'payBack',
          component:PayBack
        },
        {
          path:'member',
          component:Member,
          children:[
            {
              path:'',
              component:MemberInfo
            },
            {
              path:'order',
              component:MemberOrder
            }
          ] 
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],
  //路由行为定制
  scrollBehavior(){
    return {
      top:0
    }
  }
})

export default router
