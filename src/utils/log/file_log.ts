/** 
  File: file_log.ts
  Description: 文件日志
*/
import * as log4js from "log4js";

const levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL,
}

log4js.configure({
    appenders: {
        console: { type: 'console' }
    },
    categories: {
        default: {
            appenders: ['out', 'app'],
            level: 'debug',
        }
    }
})

/**
 * 日志输出, level 为 debug
 * @param {string} content
 */
export const debug = (content: string) => {
    let logger = log4js.getLogger('debug')
    logger.level = levels.debug
    logger.debug(content)
}


/**
 * 日志输出, level 为 trace
 * @param {string} content
 */
export const trace = (content: string) => {
    let logger = log4js.getLogger('trace')
    logger.level = levels.trace
    logger.trace(content)
}

/**
 * 日志输出, level 为 fatal
 * @param {string} content
 */
export const fatal = (content: string) => {
    let logger = log4js.getLogger('fatal')
    logger.level = levels.fatal
    logger.fatal(content)
}

/**
 * 日志输出, level 为 info
 * @param {string} content
 */
export const info = (content: string) => {
    let logger = log4js.getLogger('info')
    logger.level = levels.info
    logger.info(content)
}

/**
 * 日志输出, level 为 warn
 * @param {string} content
 */
export const warn = (content: string) => {
    let logger = log4js.getLogger('warn')
    logger.level = levels.warn
    logger.warn(content)
}

/**
 * 日志输出, level 为 error
 * @param {string} content
 */
export const error = (content: string) => {
    let logger = log4js.getLogger('error')
    logger.level = levels.error
    logger.error(content)
}

