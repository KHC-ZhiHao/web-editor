import * as io from 'socket.io'
import * as http from 'http'
import * as express from 'express'

interface EmitData {
    channel: string
    data: object
}

class Server {

    public host

    private app
    private socket
    private server
    private events = []

    constructor (port: string = '3000', ip: string = 'localhost') {
        this.app = express()
        this.app.use(express.static(`./static`))
        this.host = `http://${ip}:${port}`
        this.server = http.createServer(this.app)
        this.socket = io(this.server)
        this.socket.on('connection', function (socket) {
            for (let event of this.events) {
                socket.on(event.channel, event.handler)
            }
        })
        this.server.listen(port, ip, () => {
            console.log(this.host)
        })
    }

    get (path: string, callback: () => void) {
        this.app.get('/apis/' + path, callback)
    }

    post (path: string, callback: () => void) {
        this.app.post('/apis/' + path, callback)
    }

    on (channel: string, handler: () => void): void {
        this.events.push({
            channel,
            handler
        })
    }

    emit (channel: string, data: EmitData) {
        this.socket.emit(channel, data)
    }
}

export default Server
