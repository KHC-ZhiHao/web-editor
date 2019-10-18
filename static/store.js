export default class {
    constructor() {
        this.view = null
        this.loading = false
        this.codemirrorOptions = {
            mode: null,
            lineNumbers: true,
            theme: 'lucario',
            indentUnit : 4,
            tabSize : 4,
            styleActiveLine: true
        }
    }

    setMode(ext) {
        switch(ext){
            case "html":
                return this.codemirrorOptions.mode = {
                    name: "htmlmixed",
                    scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,mode: null}]
                }
            case "py":
                return this.codemirrorOptions.mode = {
                    name: "python",
                    version: 3,
                    singleLineStringErrors: false
                }
            case "css":
                return this.codemirrorOptions.mode = "css"
            case "php":
                return this.codemirrorOptions.mode = "application/x-httpd-php"
            case "cpp":
                return this.codemirrorOptions.mode = "text/x-c++src"
            case "vue":
                return this.codemirrorOptions.mode = "text/x-vue"
            case "js":
                return this.codemirrorOptions.mode = 'javascript'
            case "ts":
                return this.codemirrorOptions.mode = 'text/typescript'
            case "json":
                return this.codemirrorOptions.mode = 'javascript'
            default:
                return this.codemirrorOptions.mode = null
        }
    }

    open(name, path) {
        if (this.view && this.view.path === path) {
            return null
        }
        let ext = name.split('.').pop()
        let params = { path }
        axios.get('./apis/open', { params }).then(result => {
            this.setMode(ext)
            this.view = {
                name,
                path,
                data: result.data.text
            }
        })
    }
}
