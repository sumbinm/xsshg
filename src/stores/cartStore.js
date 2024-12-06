// 封装购物车
import { computed } from "vue"
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from "./user"
import { insertCartAPI } from "@/apis/cart"
import { findNewCartListAPI,delCartAPI } from "@/apis/cart"


export const useCartStore = defineStore('cart', () => {

  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

   //抽象一个获取最新购物车列表函数
   const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  const cartList = ref([])
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if(isLogin.value){
      //登录逻辑
      await insertCartAPI({skuId, count})
      updateNewList()
    }else{
      //添加购物车操作
      //已添加过  count + 1
      //没有添加过，直接push
      //通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了即添加过
   const item = cartList.value.find((item) => item.skuId === goods.skuId)
   if(item) {
    item.count++
   } else {
     cartList.value.push(goods)
   }
    }
      
  }

  //删除购物车
  const delCart = async(skuId) => {
    if(isLogin.value){
      //删除接口
      await delCartAPI([skuId])
      updateNewList()
    }else{
      const idx  = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
    
  }

   //清楚购物车
   const clearCart = () => {
    cartList.value = []
  }

 //单选功能
 const singleCheck = (skuId, selected) => {
  //通过skuId找到要修改的一项，把它的selected改为传来的selected
  const item = cartList.value.find((item) => item.skuId === skuId)
  item.selected = selected
}

  //计算选中商品数量以及价格
 //1、总的数量
 const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
 //2、总价
 const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
 //是否全选
 const isAll = computed(() => cartList.value.every((item) => item.selected))
//3、已选择数量
const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
//4、已选择商品合计
const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
//全选功能
const allCheck = (selected) => {
  //把每一项的selected都设置为当前
  cartList.value.forEach(item => item.selected = selected)
}



  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    isAll,
    allCheck,
    singleCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
},{
  persist: true
})
