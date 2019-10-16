export default class {
    constructor() {
        this.view = null
        this.origin = null
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
        this.view = { name, path, data: null }
        this.origin = null
        this.setMode(ext)
        axios.get('./apis/open', { params }).then(({ data }) => {
            this.origin = data.text
            this.view.data = data.text
        })
    }

    save() {
        let parmas = {
            path: this.view.path,
            data: this.view.data
        }
        axios.post('./apis/save', parmas).then(() => {
            this.origin = this.view.data
        })
    }
}