// src/utils/index.ts
import * as log4js from "@/utils/log/file_log";

const CODE = {
    SUCCESS: 200,
    PARAM_ERROR: 10001, // 参数错误
    USER_ACCOUNT_ERROR: 20001, // 用户未登录
    USER_LOGIN_ERROR: 30001,
    BUSINESS_ERROR: 40001, // 
    AUTH_ERROR: 50001, // 认证失败
}

module.exports = {
    /**
     * 分页结构封装
     * @param {number} pageNum 
     * @param {number} pageSize
     */
    pager({ pageNum = 1, pageSize = 10 }: any) {
        pageNum *= 1;
        pageSize *= 1;
        const skipIndex = (pageNum - 1) * pageSize;
        return {
            page: {
                pageNum,
                pageSize
            },
            skipIndex
        }
    },
    success(data = '', msg = '', code = CODE.SUCCESS) {
        log4js.info("正确")
        return {
            code, data, msg
        }
    },
    fail(msg = '', code = CODE.BUSINESS_ERROR) {
        log4js.debug('错误')
        return {
            code, msg
        }
    }
}
