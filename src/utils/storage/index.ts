/** 
  File: index.ts
  Description: storage 封装
*/
import config from "~/utils/config"

export default {
    setItem(key: any, val: any) {
        let storage = this.getStorage()
        storage[key] = val
        window.localStorage.setItem(
            config.namespace,
            JSON.stringify(storage)
        )
    },
    getItem(key: any) {
        return this.getStorage()[key]
    },
    getStorage() {
        return JSON.parse(
            window.localStorage.getItem(
                config.namespace
            ) || "{}"
        )
    },
    clearItem(key: any) {
        let storage = this.getStorage()
        delete storage[key]
        window.localStorage.setItem(
            config.namespace,
            JSON.stringify(storage)
        )
    },
    clearAll() {
        window.localStorage.clear()
    }
}