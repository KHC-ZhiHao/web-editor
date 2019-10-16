import * as http from 'http'
import * as express from 'express'
import * as bodyParser from 'body-parser'

class Server {

    public host

    private app
    private server

    constructor (filePath: string, port: string = '3000', ip: string = 'localhost') {
        this.app = express()
        this.app.use(express.static(`${filePath}/static`))
        this.app.use(bodyParser.json())
        this.host = `http://${ip}:${port}`
        this.server = http.createServer(this.app)
        this.server.listen(port, ip, () => {
            console.log(this.host)
        })
    }

    get (path: string, callback: (request: express.Request, response: express.Response) => void) {
        this.app.get('/apis/' + path, callback)
    }

    post (path: string, callback: (request: express.Request, response: express.Response) => void) {
        this.app.post('/apis/' + path, callback)
    }
}

export default Server
