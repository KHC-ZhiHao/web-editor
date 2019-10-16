import * as fs from 'fs'
import * as pathModule from 'path'
import configs from './configs'

class Menu {

    public name: string
    public type: string
    public path: fs.PathLike
    public dirs: Array<Menu> = []
    public files: object = {}

    constructor (path: fs.PathLike = '.') {
        this.path = path
        this.name = pathModule.basename(path.toString())
    }

    get (): object {
        this.refresh()
        let dirs = {}
        for (let dir of this.dirs) {
            dirs[dir.name] = dir.get()
        }
        return {
            dirs,
            files: this.files
        }
    }

    refresh (): void {
        let files = fs.readdirSync(this.path)
        this.dirs = []
        this.files = {}
        for (let name of files) {
            let path = this.path + '/' + name
            let state = fs.statSync(path)
            if (configs.ignoreFiles.includes(name)) {
                continue
            }
            if (state.isDirectory()) {
                this.dirs.push(new Menu(path))
            } else {
                this.files[name] = path
            }
        }
    }
}

export default Menu
