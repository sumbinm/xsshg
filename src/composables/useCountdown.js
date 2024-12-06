import dayjs from 'dayjs'
import { ref, computed, onUnmounted } from 'vue'

export const useCountDown = () => {
  // 响应式数据
  const time = ref(0)
  // 存储定时器ID
  let timerId = null
  
  // 格式化时间为 XX分XX秒
  const formatTime = computed(() => {
    return dayjs.unix(time.value).format('mm分ss秒')
  })

  // 开始倒计时函数
  const start = (currentTime) => {
    time.value = currentTime
    // 清除之前的定时器（避免重复定时器）
    if (timerId) {
      clearInterval(timerId)
    }
    // 开始倒计时逻辑
    timerId = setInterval(() => {
      if (time.value > 0) {
        time.value--
      } else {
        clearInterval(timerId) // 时间结束后清除定时器
      }
    }, 1000)
  }

  // 组件销毁时，清除定时器
  onUnmounted(() => {
    if (timerId) {
      clearInterval(timerId)
    }
  })

  return {
    formatTime,
    start
  }
}
