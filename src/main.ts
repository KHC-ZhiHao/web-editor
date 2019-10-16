import * as fs from 'fs'

import Menu from './menu'
import Server from './server'

export function handler (filePath: string, port: string) {
    const menu = new Menu()
    const server = new Server(filePath, port)

    server.get('menu', (request, response) => {
        response.status(200).send(menu.get())
    })

    server.get('open', (request, response) => {
        let path = request.query.path
        let text = fs.readFileSync(path, 'utf8')
        response.status(200).send({ text })
    })

    server.post('save', (request, response) => {
        let path = request.body.path
        let data = request.body.data
        fs.writeFileSync(path, data)
        response.status(200).send()
    })
}
