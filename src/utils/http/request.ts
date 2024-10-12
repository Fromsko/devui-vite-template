/** 
  File: request.ts
  Description: Axios 请求封装
*/
import router from '@/router'
import axios from 'axios'
import config from '~/utils/config'

const TOKEN_ERROR = 'Token 已过期'
const NETWORK_ERROR = '网络异常'

const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000,
})

// 请求封装
service.interceptors.request.use((req: any) => {
    const headers = req.headers

    if (!headers.Authorization) {
        headers.Authorization = 'bear fromsko'
    }
    return req
})

// 响应封装
service.interceptors.response.use((res: any) => {
    const { code, data, msg } = res.data

    if (code === 200) {
        return data
    } else if (code === 40001) {
        // log.error(TOKEN_ERROR)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_ERROR)
    } else {
        // ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

interface RequestOptions {
    method?: string
    mock?: boolean
    params?: any
    data?: any
    url: string
}

function request(options: RequestOptions): any {
    options.method = options.method || 'get'

    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }

    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
    }

    return service(options)
}

['get', 'post', 'delete', 'put'].forEach((item) => {
    // 使用 as any 来避免类型检查错误
    ; (request as any)[item] = (url: string, data: any, options: any) => {
        return request({
            url,
            data,
            method: item,
            ...options,
        })
    }
})

export default request
