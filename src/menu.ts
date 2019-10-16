import * as fs from 'fs'
import * as path from 'path'
import configs from './configs'

class Menu {

    public type:string
    public path:fs.PathLike
    public files:Array<Menu>

    constructor(type: string, path: fs.PathLike) {
        this.type = type
        this.path = path
    }

    refresh (): void {
        let files = fs.readdirSync(this.path)
        for (let file of files) {
            let p = this.path + '/' + file
            let name = path.basename(file)
            let state = fs.statSync(file)
            if (configs.ignoreFiles.includes(name)) {
                continue
            }
            if (state.isDirectory()) {
                this.files.push(new Menu('dir', p))
            } else {
                this.files.push(new Menu('file', p))
            }
        }
    }
}

export default new Menu('dir', './')
