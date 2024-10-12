/** 
  File: web_log.ts
  Description: 浏览器日志
*/

class WebLog {
    private static instance: WebLog
    private isProduction: boolean

    constructor(mode: string) {
        this.isProduction = mode === 'production'
    }

    public create(mode: string) {
        if (!WebLog.instance) {
            WebLog.instance = new WebLog(mode)
        }
        return WebLog.instance
    }

    private isEmpty = (value: any) => {
        return value == null || value === undefined || value === ''
    }

    private prettyPrint = (title: any, text: any, color: any) => {
        if (this.isProduction) return
        console.log(
            `%c ${title} %c ${text} %c`,
            `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
            `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
            'background:transparent'
        )
    }

    public info = (textOrTitle: any, content = '') => {
        const title = this.isEmpty(content) ? 'Info' : textOrTitle
        const text = this.isEmpty(content) ? textOrTitle : content
        this.prettyPrint(title, text, '#909399')
    }

    public error = (textOrTitle: any, content = '') => {
        const title = this.isEmpty(content) ? 'Error' : textOrTitle
        const text = this.isEmpty(content) ? textOrTitle : content
        this.prettyPrint(title, text, '#F56C6C')
    }

    public warning = (textOrTitle: any, content = '') => {
        const title = this.isEmpty(content) ? 'Warning' : textOrTitle
        const text = this.isEmpty(content) ? textOrTitle : content
        this.prettyPrint(title, text, '#E6A23C')
    }

    public success = (textOrTitle: any, content = '') => {
        const title = this.isEmpty(content) ? 'Success ' : textOrTitle
        const text = this.isEmpty(content) ? textOrTitle : content
        this.prettyPrint(title, text, '#67C23A')
    }

    public table = () => {
        const data = [
            { id: 1, name: 'Alice', age: 25 },
            { id: 2, name: 'Bob', age: 30 },
            { id: 3, name: 'Charlie', age: 35 }
        ]
        console.log(
            '%c id%c name%c age',
            'color: white; background-color: black; padding: 2px 10px;',
            'color: white; background-color: black; padding: 2px 10px;',
            'color: white; background-color: black; padding: 2px 10px;'
        )

        data.forEach((row) => {
            console.log(
                `%c ${row.id} %c ${row.name} %c ${row.age} `,
                'color: black; background-color: lightgray; padding: 2px 10px;',
                'color: black; background-color: lightgray; padding: 2px 10px;',
                'color: black; background-color: lightgray; padding: 2px 10px;'
            )
        })
    }

    public picture = (url: any, scale = 1) => {
        if (this.isProduction) return
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
            const c = document.createElement('canvas')
            const ctx = c.getContext('2d')
            if (ctx) {
                c.width = img.width
                c.height = img.height
                ctx.fillStyle = 'red'
                ctx.fillRect(0, 0, c.width, c.height)
                ctx.drawImage(img, 0, 0)
                const dataUri = c.toDataURL('image/png')

                console.log(
                    `%c sup?`,
                    `font-size: 1px;
                    padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
                    background-image: url(${dataUri});
                    background-repeat: no-repeat;
                    background-size: ${img.width * scale}px ${img.height * scale}px;
                    color: transparent;
                    `
                )
            }
        }
        img.src = url
    }
}

export default new WebLog(import.meta.env.MODE);