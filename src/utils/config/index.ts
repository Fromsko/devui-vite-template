/** 
  File: index.ts
  Description: Config 配置信息
*/

import log from "../log/web_log";


const ENV = import.meta.env.MODE

log.info(ENV)
log.info(JSON.stringify(import.meta.env))

const EnvConfig = {
    dev: {
        baseApi: 'http://localhost:9000/api/v1',
        mockApi: 'http://localhost:9000/api/v1',
    },
    prod: {
        baseApi: '/',
        mockApi: 'https://mock.presstime.cn/mock/668987cbcb2f4f1158f47e0e/manager-fe',
    }
}

export default {
    ENV,
    namespace: "fromsko",
    // ...EnvConfig[ENV]
}