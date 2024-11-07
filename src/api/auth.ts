/** 
  File: auth.ts
  Description: Auth api
*/
import instance from "@/utils/http/request"
import { AuthParmas as AuthParams } from '@/utils/model/auth'

const login = (params: AuthParams) => {
    return instance({
        url: '/user/login',
        method: 'post',
        data: params
    })
}

const logout = () => {
    return instance({
        url: '/user/logout',
        method: 'post',
    })
}

export { login, logout }

