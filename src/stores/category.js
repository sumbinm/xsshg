import { ref } from 'vue'
import { defineStore } from 'pinia'
import {getCategroyAPI} from '@/apis/Layout'
export const useCategoryStore = defineStore('category', () => {
  //导航列表
  const categoryList = ref([])
  const getCategroy= async () =>{
    const res = await getCategroyAPI()
    categoryList.value = res.result
  }
    return {
        categoryList,
        getCategroy
    }
  })

 