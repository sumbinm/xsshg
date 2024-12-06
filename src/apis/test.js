import http from '@/utils/http'

export function getCategroy() {
    return http({
        url: '/home/category/head'
    })
}

